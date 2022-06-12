FROM node:18

RUN userdel -r node
RUN useradd -m builder
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
