FROM node:8.5.0
LABEL maintainer="Unboxed Technology LLC, https://unboxedtechnology.com"
LABEL author="Hayden Braxton, haydenbraxton@unboxedtechnology.com"

# ENV or ARG?
# 
# https://docs.docker.com/engine/reference/builder/#arg
# https://docs.docker.com/engine/reference/builder/#env
# 
# TL;DR both are ENV variables. ARG can be overwritten at build time
ENV NODE_ENV=development

# update system level tools I need
RUN mkdir app && \
		apt-get update && \
		apt-get install ncftp
WORKDIR app

# install dependencies
# COPY or ADD?
# 
# https://docs.docker.com/engine/reference/builder/#add
# https://docs.docker.com/engine/reference/builder/#copy
# 
# TL;DR they do the same thing, except ADD can pull from remote resources
ADD docker/package.json package.json
RUN yarn && yarn cache clean

# expose ports to serve app from inside container
EXPOSE 8100 35729 53703
# default command to run when starting the container
# can overwrite with --entrypoint or pass additional args
ENTRYPOINT [ "npm", "run", "serve" ]
