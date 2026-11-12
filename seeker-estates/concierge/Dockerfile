FROM node:22-slim
# ffmpeg lets the assistant look at videos guests send (a few still frames).
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY public ./public
COPY scripts ./scripts
ENV NODE_ENV=production PORT=8787 DATA_DIR=/data
VOLUME /data
EXPOSE 8787
# Runs as the image's default user so it can write to a host-mounted disk at /data.
CMD ["node", "--disable-warning=ExperimentalWarning", "src/server.js"]
