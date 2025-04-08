FROM public.ecr.aws/docker/library/node:latest

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD pnpm migration:run && pnpm start
