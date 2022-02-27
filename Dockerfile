FROM node:17-alpine AS codeclimate-eslint

WORKDIR /usr/src/app

ARG ESLINT_VERSION=8.10.0

ENV PREFIX=/usr/src/app/node_modules
ENV PATH=$PREFIX/.bin:$PREFIX/bin:$PATH

COPY bin ./bin
COPY test ./test
COPY local/engine.json ./

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
RUN adduser --uid 9000 --gecos "" --disabled-password app \
    && apk --no-cache add --virtual build-dependencies \
      bash=~5 \
      git=~2 \
      jq=~1 \
    && npm i -g pnpm@latest \
    && pnpm install eslint  eslint-formatter-gitlab\
    && VERSION="v${ESLINT_VERSION}" \
    && ./bin/docs "$VERSION" \
    && jq --arg version "$VERSION" '.version = $version' > /engine.json < ./engine.json \
    #&& apk del build-dependencies \
    && chown -R app:app ./

USER app

VOLUME ["/code"]
WORKDIR /code


CMD ["/usr/src/app/bin/codeclimate-eslint","/config.json","/code"]

ARG BUILD_DATE
ARG REVISION
ARG VERSION

LABEL maintainer="Megabyte Labs <help@megabyte.space>"
LABEL org.opencontainers.image.authors="Brian Zalewski <brian@megabyte.space>"
LABEL org.opencontainers.image.created=$BUILD_DATE
LABEL org.opencontainers.image.description="An ESLint 8 slim container and a CodeClimate engine container for GitLab CI"
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

ENTRYPOINT ["eslint"]
CMD ["--version"]

LABEL space.megabyte.type="code-climate-standalone"