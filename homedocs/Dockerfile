ARG BUILD_FROM
FROM $BUILD_FROM

# install dependencies
RUN apt-get update && apt-get install -y unzip

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.1.24"

# Copy server into image
COPY server /server
WORKDIR /server

RUN ~/.bun/bin/bun install
RUN ~/.bun/bin/bun run build

# copy and setup run script
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]