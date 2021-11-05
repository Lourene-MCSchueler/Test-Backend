# API-ALLIAR

Teste Backend Alliar.
Objetivo: Construir uma API para manutenção de laboratórios e exames.

## ENTIDADES

| Exame       | Laboratório |
| ----------- | ----------- |
| nome        | nome        |
| tipo        | endereço    |
| status      | status      |

## ENDPOINTS

### Exame

*(POST) **/exam** --Cadastra um novo exame

*(GET) **/exam/active** --Retorna lista de exames ativos

*(PUT) **/exam/:id** --Atualiza um exame existente

*(DELETE) **/exam/:id** --Remove logicamente um exame ativo

*(POST) **/exam/associate** --Associa um exame ativo à um laboratório ativo

*(DELETE) **/exam/disassociate/exam/:exam_id/lab/:lab_id** --Desassocia um exame ativo de um laboratório ativo

*(GET) **/exam/name/:name** --Busca pelo nome do exame e retorna todos os laboratórios associados a esse exame.

### Laboratório

*(POST) **/lab** --Cadastra um novo laboratório

*(GET) **/lab/active** --Retorna lista de laboratórios ativos

*(PUT) **/lab/:id** --Atualiza um laboratório existente

*(DELETE) **/lab/:id** --Remove logicamente um laboratório ativo

## TECNOLOGIAS

-NodeJS
-Express
-PostgreSQL

### Ambiente de desenvolvimento

Clonar o projeto

```
git clone https://github.com/Lourene-MCSchueler/Test-Backend
```

Criar arquivo .env na raiz do projeto e configurar a connection string do banco de dados

Criar as tabelas. (Ver arquivo /sql/init.sql)

Instalar os pacotes com npm

```
$ npm install
```

Executar a aplicação localmente

```
$ npm run dev
```
Navegador 

```
localhost:5000
```
## Projeto

[Clique neste link](https://api-alliar.herokuapp.com/)

