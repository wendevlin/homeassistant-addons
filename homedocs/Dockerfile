ARG BUILD_FROM
FROM $BUILD_FROM

# install dependencies
RUN apk add nodejs-current npm

# Copy server into image
COPY server /server
WORKDIR /server

RUN npm install
RUN npm run build

# copy and setup run script
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]