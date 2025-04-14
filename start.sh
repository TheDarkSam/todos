#!/bin/bash

# Instalando as dependências
echo "Instalando as dependências..."
npm install

# Rodando as migrações do Prisma
echo "Rodando as migrações do Prisma..."
npx prisma migrate deploy

# Iniciando a aplicação
echo "Iniciando a aplicação..."
npm start
