FROM node:17-alpine AS codeclimate-eslint

WORKDIR /usr/src/app

ENV PREFIX "/usr/local/node_modules"
ENV PATH "$PREFIX/bin:$PATH"
ENV NODE_PATH "$PREFIX"
ENV NPM_CONFIG_PREFIX "$PREFIX"

COPY bin/docs ./bin/docs
COPY engine.json package.json yarn.lock ./

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
RUN adduser --uid 9000 --gecos "" --disabled-password app \
    && mkdir $PREFIX \
    && apk --no-cache add --virtual build-dependencies \
      git=~2 \
      jq=~1 \
      yarn=~1 \
    && yarn config set prefix "$PREFIX" \
    && yarn install --modules-folder "$PREFIX" --ignore-scripts \
    && yarn cache clean \
    && chown -R app:app "$PREFIX" \
    && VERSION="v$(yarn list eslint | grep eslint | sed -n 's/.*@//p')" \
    && ./bin/docs "$VERSION" \
    && jq --arg version "$VERSION" '.version = $version' > /engine.json < engine.json \
    && apk del build-dependencies

COPY . ./

RUN chown -R app:app ./

USER app

VOLUME /code
WORKDIR /code

CMD ["/usr/src/app/bin/eslint.js"]

ARG BUILD_DATE
ARG REVISION
ARG VERSION

LABEL maintainer="Megabyte Labs <help@megabyte.space>"
LABEL org.opencontainers.image.authors="Brian Zalewski <brian@megabyte.space>"
LABEL org.opencontainers.image.created=$BUILD_DATE
LABEL org.opencontainers.image.description="A multi-build project including an ESLint 8 standalone slim container and a slim CodeClimate engine container for GitLab CI"
LABEL org.opencontainers.image.documentation="https://github.com/ProfessorManhattan/codeclimate-eslint/blob/master/README.md"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.revision=$REVISION
LABEL org.opencontainers.image.source="https://gitlab.com/megabyte-labs/docker/codeclimate/eslint.git"
LABEL org.opencontainers.image.url="https://megabyte.space"
LABEL org.opencontainers.image.vendor="Megabyte Labs"
LABEL org.opencontainers.image.version=$VERSION
LABEL space.megabyte.type="code-climate"

FROM codeclimate-eslint AS eslint

VOLUME /work
WORKDIR /work

USER root

RUN rm -rf /code \
  && rm -rf /usr/src/app \
  && rm -f /engine.json

USER app

ENTRYPOINT ["pnpx", "eslint"]
CMD ["--version"]

LABEL space.megabyte.type="code-climate-standalone"
