FROM node:14-alpine3.15

RUN adduser --uid 9000 --gecos "" --disabled-password app

WORKDIR /usr/src/app

ENV PREFIX=/usr/local/node_modules
ENV PATH=$PREFIX/.bin:$PATH
ENV NODE_PATH=$PREFIX
ENV NPM_CONFIG_PREFIX=$PREFIX

RUN mkdir $PREFIX

COPY bin/docs ./bin/docs
COPY engine.json package.json yarn.lock ./

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
RUN apk --no-cache add \
    yarn~=1 git=~2 jq=~1 && \
    yarn config set prefix $PREFIX && \
    yarn install --modules-folder $PREFIX && \
    chown -R app:app $PREFIX 
    # This was too much work only to set the eslint verson on engine.json
    # and did not work as the git version did not exist in upstream
    #version="v$(yarn list eslint | grep eslint | sed -n 's/.*@//p')" && \
    #./bin/docs "$version" && \
    #cat engine.json | jq ".version = \"$version\"" > /engine.json

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
LABEL org.opencontainers.image.description="Code climate engine for ES Lint"
LABEL org.opencontainers.image.documentation="https://gitlab.com/megabyte-labs/dockerfile/codeclimate/eslint/-/blob/master/README.md"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.revision=$REVISION
LABEL org.opencontainers.image.source="https://gitlab.com/megabyte-labs/dockerfile/codeclimate/eslint.git"
LABEL org.opencontainers.image.url="https://megabyte.space"
LABEL org.opencontainers.image.vendor="Megabyte Labs"
LABEL org.opencontainers.image.version=$VERSION
LABEL space.megabyte.type="code-climate"