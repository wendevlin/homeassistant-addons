#!/usr/bin/with-contenv bashio

if [ -z "$(ls -A /config/homedocs)" ]; then
    # create a directory named "homedocs" in the "/config" directory if it doesn't already exist.
    mkdir -p /config/homedocs
    mkdir -p /config/homedocs/assets
    mkdir -p /config/homedocs/content
    mkdir -p /config/homedocs/files
    echo "created /config/homedocs directory."

    # copy the example contents of the "/starlight/src/content/docs" directory to the "/config/homedocs" directory.
    cp -r /starlight/src/content/docs /config/homedocs/content
    cp -r /starlight/src/assets /config/homedocs
    cp -r /starlight/public/files /config/homedocs
    echo "copied example content to /config/homedocs."
else
    echo "/config/homedocs is not empty, skipping copy example content."
fi

rm -rf /starlight/src/content/docs
rm -rf /starlight/src/assets
rm -rf /starlight/public/files

# Link /config/homedocs with /starlight/content/docs
ln -s /config/homedocs/content/docs /starlight/src/content
ln -s /config/homedocs/assets /starlight/src
ln -s /config/homedocs/files /starlight/public

# ingress path
INGRESS_ENTRY=$(bashio::addon.ingress_entry)

# build timeout option
BUILD_TIMEOUT_IN_SECONDS=$(bashio::config 'buildTimeoutInSeconds')

# start the starlight dev server to get changes on the fly
INGRESS_ENTRY=$INGRESS_ENTRY BUILD_TIMEOUT_IN_SECONDS=$BUILD_TIMEOUT_IN_SECONDS bun index.js