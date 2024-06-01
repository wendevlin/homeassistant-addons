#!/usr/bin/with-contenv bashio

if [ -z "$(ls -A /config/homedocs)" ]; then
    # create a directory named "homedocs" in the "/config" directory if it doesn't already exist.
    mkdir -p /config/homedocs
    echo "created /config/homedocs directory."

    # copy the example contents of the "/server/docs" directory to the "/config/homedocs" directory.
    cp -r /server/docs/* /config/homedocs
    echo "copied example content to /config/homedocs."
else
    echo "/config/homedocs is not empty, skipping copy example content."
fi

# ingress path
# INGRESS_ENTRY=$(bashio::addon.ingress_entry)

# build timeout option
# BUILD_TIMEOUT_IN_SECONDS=$(bashio::config 'buildTimeoutInSeconds')

# start the webserver
DOCS_BASE_PATH=/config/homedocs bun run start:production