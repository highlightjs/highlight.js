# Dockerfile for highlight.js
#
# Build image:
#   docker build -t highlight-js .
#
# Run container:
#   docker run --rm -it --publish 8080:80 highlight-js
#
#   And open a browser to http://localhost:8080

FROM node:12-slim
RUN apt-get update -qq \
    && apt-get install --yes --no-install-recommends \
        nginx git \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /var/www/html
COPY package*.json /var/www/html/
RUN npm install
COPY . .
RUN node tools/build.js :common
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
