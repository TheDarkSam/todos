#!/bin/bash

# Atualize pacotes
echo "Atualizando pacotes..."
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (caso não esteja instalado)
echo "Instalando Node.js..."
sudo apt install -y nodejs npm

# Instalar dependências do projeto
echo "Instalando dependências do projeto..."
npm install

# Rodar as migrações do Prisma
echo "Rodando migrações do Prisma..."
npx prisma migrate deploy

# Iniciar a aplicação
echo "Iniciando a aplicação..."
npm start
