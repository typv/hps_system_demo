# Nest Saga - User service

# Getting Started

## Server Requirements

- Node.js 20.12.1
- PostgreSQL 14

## Installing preparation

1. Default Application $BASEPATH : `/home/app.user/user-service`

2. Copy the .env file from .env.example under $BASEPATH

# Build with Docker

## 1. Setup docker

```bash
  make setup
```

```bash
  make up
```

## 2. Migrate database

## 2.1. Migrate

### 2.1.1 Create migration file
```bash
  make migrationCreate n=[your_migration_name]
```

### 2.1.2 Migrate
```bash
  make buildNest
  make migrate
```

## 2.2. Revert Migration

```bash
  make migrationRevert
```

## 3. Run dev mode

```bash
  make dev
```

## 4. Other

### 4.1. Run seed

```bash
  make seedRun
```

