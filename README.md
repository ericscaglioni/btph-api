# **BTPH Messages API**

## API de mensagens do quadro BTPH do blog [Bola Presa](https://bolapresa.com.br/)
---

> ## O que ela faz?
- API responsável por salvar e listar todas as mensagens recebidas do quadro Both Teams Played Hard do maior blog brasileiro sobre NBA, o [Bola Presa](https://bolapresa.com.br/)

> ## Requisitos da aplicação
- [node.js](https://nodejs.org/en/)
- [docker](https://www.docker.com/)

> ## Instalação e configuração
- Após instalar o node.js, clone o projeto em algum diretório de sua máquina
- Dentro do diretório do projeto rode o seguinte comando: `npm install`
- O comando é responsável por **baixar todas as dependências** necessárias e instalar os pacotes automaticamente.
- Se tudo ocorrer bem, você estará pronto para rodar a aplicação.

> ## Iniciando a aplicação
- Para rodar a aplicação localmente, utilize o seguinte comando via terminal, dentro do diretório do projeto: `npm run dev`;
- O comando é responsável por criar as imagens dockers necessárias para que o projeto consiga rodar localmente em qualquer ambiente.
- Após a execução com sucesso do comando, a api estará disponível, por padrão na URL: `http://localhost:5050/api/{rota}`

> ## TDD, SOLID e Clean Architecture
- A aplicação foi desenvolvida utilizando TDD (Test Driven Development), princípios do SOLID e Clean Architecture.
- Comandos para rodar os testes via terminal:
  * `npm run test:unit` - executa apenas os testes unitários
  * `npm run test:integration` - executa apenas os testes de integração
  * `npm run test:ci` - executa todos os testes e mostra a cobertura de código
  * `npm test` ou `npm t` - executa todos os testes sem mostrar a cobertura de código