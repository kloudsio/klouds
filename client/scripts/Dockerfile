FROM iojs:latest

# babel io.js
RUN npm install -g babel

# npm install
ADD package.json /root/package.json
RUN npm install -q
RUN mkdir /root/dist
ADD . /root/

# link the -v to get the bundled code
VOLUME /root/dist

WORKDIR /root
CMD ./scripts/build
