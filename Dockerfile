FROM node:17-alpine AS codeclimate-eslint

WORKDIR /work

COPY local/codeclimate-eslint /usr/local/bin/codeclimate-eslint
COPY local/engine.json ./engine.json

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
RUN adduser --uid 9000 --gecos "" --disabled-password app \
    && apk --no-cache add --virtual codeclimate-deps \
      jq=~1 \
    && apk --no-cache add --virtual build-deps \
      bash=~5 \
      git=~2 \
    && npm i -g pnpm@latest \
    && pnpm i -g eslint@latest \
    && VERSION="$(eslint -v | sed 's/^v//')" \
    && jq --arg version "$VERSION" '.version = $version' > /engine.json < ./engine.json \
    && rm ./engine.json \
    && apk del build-deps

USER app

VOLUME ["/code"]
WORKDIR /code

CMD ["codeclimate-eslint"]

ARG BUILD_DATE
ARG REVISION
ARG VERSION

LABEL maintainer="Megabyte Labs <help@megabyte.space>"
LABEL org.opencontainers.image.authors="Brian Zalewski <brian@megabyte.space>"
LABEL org.opencontainers.image.created=$BUILD_DATE
LABEL org.opencontainers.image.description="An ESLint 8 slim container and a CodeClimate engine container for GitLab CI"
LABEL org.opencontainers.image.documentation="https://github.com/megabyte-labs/codeclimate-eslint/blob/master/README.md"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.revision=$REVISION
LABEL org.opencontainers.image.source="https://github.com/megabyte-labs/codeclimate-eslint.git"
LABEL org.opencontainers.image.url="https://megabyte.space"
LABEL org.opencontainers.image.vendor="Megabyte Labs"
LABEL org.opencontainers.image.version=$VERSION
LABEL space.megabyte.type="codeclimate"

FROM codeclimate-eslint AS eslint

WORKDIR /work

USER root

RUN apk del codeclimate-deps \
  && rm /engine.json

USER app

ENTRYPOINT ["eslint"]
CMD ["--version"]

LABEL space.megabyte.type="linter"
