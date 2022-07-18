FROM node:18-alpine

RUN apk update && apk add bash &&apk add --upgrade setpriv
SHELL ["/bin/bash", "-c"]
RUN deluser --remove-home node
RUN adduser -D builder
RUN mkdir -p /workdir/frontend
RUN chown -R builder /workdir

WORKDIR /workdir/frontend

COPY . .
RUN yarn install

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3000

CMD ["/bin/bash"]
