# --------- Builder ---------
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/eslint-config ./packages/eslint-config/

RUN pnpm install --filter=./apps/frontend... --frozen-lockfile

COPY . .

RUN pnpm --filter=./apps/frontend... build

# --------- Runner ---------
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/eslint-config ./packages/eslint-config

RUN pnpm install

COPY --from=builder /app/apps/frontend ./apps/frontend
COPY --from=builder /app/packages/eslint-config ./packages/eslint-config

EXPOSE 3000

CMD ["pnpm", "--filter=./apps/frontend...", "start"]
