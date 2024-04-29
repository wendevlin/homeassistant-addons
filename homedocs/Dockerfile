ARG BUILD_FROM
FROM $BUILD_FROM

# Install requirements for add-on
RUN apk add --update --no-cache nodejs npm bash ca-certificates wget
# Install glibc to run Bun
RUN if [[ $(uname -m) == "aarch64" ]] ; \
    then \
    # aarch64
    wget https://raw.githubusercontent.com/squishyu/alpine-pkg-glibc-aarch64-bin/master/glibc-2.26-r1.apk ; \
    apk add --no-cache --allow-untrusted --force-overwrite glibc-2.26-r1.apk ; \
    rm glibc-2.26-r1.apk ; \
    else \
    # x86_64
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk ; \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub ; \
    apk add --no-cache --force-overwrite glibc-2.28-r0.apk ; \
    rm glibc-2.28-r0.apk ; \
    fi

# Install Bun
RUN npm install -g bun

# Copy starlight data
COPY starlight /starlight
WORKDIR /starlight
RUN bun install

# copy and setup webserver
COPY webserver/dist/index.js /webserver/index.js
COPY webserver/src/templates /webserver/templates
RUN mkdir -p /webserver/public

# copy and setup run script
COPY run.sh /
RUN chmod a+x /run.sh

# Disable astro telemetry
RUN bunx astro telemetry disable

WORKDIR /webserver

CMD [ "/run.sh" ]