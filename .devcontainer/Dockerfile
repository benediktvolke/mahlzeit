ARG VARIANT=14

FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

RUN sudo -u node npm install -g http-server @quasar/cli npm-check-updates

WORKDIR /app

EXPOSE 8080
