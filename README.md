# Chuck Norris Facts Api

Esta é uma api feita com Nestjs usando graphql. Essa aplicação foi feita no intuito de ser um gateway para outra api que se chama: Chuck Norris Facts Api.
Essa aplicação além de usar o graphql também usa uma biblioteca de tradução o DeepL para traduzir os fatos de acordo com o idioma que o usuário selecionou.

## Requisitos

- Node v18.20.2 ou superior

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Joallisson/chuck-norris-facts-api.git
   cd chuck-norris-facts-api

2. Crie o arquivo .env seguindo o modelo do .env.example e cole a chave do DeepL para fazer a tradução dos fatos para outros idiomas.

3. Instale as dependências:
    ```bash
    npm install

## Execução
1. Para iniciar a aplicação em modo de desenvolvimento:
    ```bash
    npm run start:dev