---
title: Cajá CLI
description: A interface de linha de comando e ferramentas para a linguagem Cajá.
icon: /caja-logo48x48.svg
repo: https://github.com/caja-tech/caja-cli
draft: false
---

Uma interface de linha de comando para a linguagem Cajá. O CLI `caja` permite executar scripts `.caja`, bem como codificá-los e decodificá-los em strings de tokens transportáveis.

## Instalação

Você pode instalar o Cajá CLI globalmente usando npm:

```bash
npm install -g @caja/cli
```

## Uso & Comandos

### 1. Executar um Script
Analise e avalie um arquivo de script `.caja` para executá-lo.

```bash
caja run -f <arquivo.caja>
```
- `-f, --file`: O caminho para o arquivo de script `.caja`.
- `-e, --export` (Opcional): Nome do arquivo para exportar os valores de log (ex: `dados.csv`).

### 2. Codificar um Script
Codifique um arquivo de script `.caja` e suas dependências em uma única string de tokens baseada em base64.

```bash
caja -f <arquivo.caja>
```
