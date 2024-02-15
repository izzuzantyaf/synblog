FROM node:18.19-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build && npm prune --production

RUN rm -rf \
  public \
  src \
  .env \
  .env.* \
  .eslintrc.json \
  .eslintrc.js \
  components.json \
  next-env.d.ts \
  next.config.js \
  next.config.ts \
  next.config.mjs \
  postcss.config.js \
  tailwind.config.js \
  tailwind.config.ts \
  tsconfig.json

CMD npm start