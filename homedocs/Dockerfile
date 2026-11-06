# The app's code lives in https://github.com/wendevlin/homedocs, this only builds a pinned commit
# of it (HOMEDOCS_REF in build.yaml). Its own Dockerfile there is the reference for these stages.

# The bundled server and the static frontend are the same for every architecture, so they are built
# natively on the build machine instead of under emulation.
FROM --platform=$BUILDPLATFORM oven/bun:1.4.2-alpine AS build
ARG HOMEDOCS_REF
RUN apk add --no-cache git
WORKDIR /app
RUN git init -q \
    && git remote add origin https://github.com/wendevlin/homedocs.git \
    && git fetch -q --depth 1 origin "${HOMEDOCS_REF}" \
    && git checkout -q FETCH_HEAD
RUN bun install --frozen-lockfile && bun run build

FROM oven/bun:1.4.2-alpine
WORKDIR /app
ENV NODE_ENV=production \
    DOCS_ROOT=/config \
    LEGACY_DOCS_ROOT=/homeassistant/homedocs \
    DATA_DIR=/data \
    PORT=8099 \
    SHARE_PORT=8098 \
    WEB_DIR=/app/web \
    SAMPLE_DOCS_DIR=/app/sample-docs
# the server is bundled into a single file, no node_modules needed at runtime
COPY --from=build /app/packages/server/dist server
COPY --from=build /app/packages/web/build web
COPY --from=build /app/sample-docs sample-docs

CMD ["bun", "server/index.js"]
