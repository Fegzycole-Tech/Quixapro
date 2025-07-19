FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/eslint-config ./packages/eslint-config/

RUN pnpm install --filter --no-production --frozen-lockfile

COPY . .

RUN pnpm --filter ./apps/backend... run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend ./apps/backend

ENV NODE_ENV=production
ENV PNPM_SKIP_POSTINSTALL=1
ENV HUSKY=0

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

EXPOSE 5000

CMD ["node", "apps/backend/dist/main"]
