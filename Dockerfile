FROM node:lts-alpine@sha256:1a9a71ea86aad332aa7740316d4111ee1bd4e890df47d3b5eff3e5bded3b3d10
RUN apk add dumb-init nano
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production
USER node
CMD ["dumb-init", "node", "server.js"]