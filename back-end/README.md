### Informações Gerais

Projeto desenvolvido para processo seletivo da Nimbus Meteorologia.

---

# Boas vindas ao repositório de Back-End projeto!

Neste projeto foi desenvolvida uma API utilizando a arquitetura MSC (Model, Service, Controller) aplicando os padrões RESTful. A API trata-se de registros de previsão de chuva onde é possível criar e visualizar as informações.

Lembrando que esta aplicação corresponde aos meus esforços para melhorar minhas hard skills e soft skills, sinta-se à vontade para explorá-la! Feedbacks construtivos são sempre bem vindos!

Abaixo você poderá encontrar mais informações técnicas sobre este projeto.

---

# Sumário

- [Habilidades](#habilidades)
- [Instruções para rodar a aplicação](#instruções-para-rodar-a-aplicação)
- [Informações do projeto](#informações-do-projeto)
  - [Linter](#linter)
  - [Banco de Dados](#banco-de-dados)
    - [Tabelas](#tabelas)
  - [Desenvolvimento](#desenvolvimento)
- [Padrões e Conexões](#padrões-e-conexões)
  - [Endpoints da API](#endpoints-da-api)
  - [Mensagens de erro](#mensagens-de-erro)

---

# Habilidades

Nesse projeto, fui capaz de:

- Trabalhar com a Arquitetura MSC (Model, Service, Controller)
- Realizar queries em banco de dados relacional com MySQL
- Conectar a aplicação com bancos de dados relacional
- Aplicar os padrões RESTful;

---

# Instruções para rodar a aplicação

1. Faça o fork e o clone do repositório

2. Instale as dependências do projeto
  * Instale as dependências:
    * `npm install`

3. Realize a conexão com seu banco de dados MySQL:
  * Crie um arquivo `.env` na raíz do projeto e declare as seguintes variáveis:
    `DB_HOST`: host do seu banco de dados
    `DB_USER`: usuário do seu banco de dados
    `DB_PASSWORD`: senha do seu banco de dados
    `PORT`: porta em que a aplicação irá rodar (opicional, padrão 3001)
  * Crie o banco de dados utilizando os comandos que estão no arquivo `mysqlBD.sql` na raíz do projeto.

4. Inicialize o projeto
  * `npm run dev`

---

# Informações do projeto

## Linter

Para garantir a qualidade do código de forma a tê-lo mais legível, de mais fácil manutenção e seguindo as boas práticas de desenvolvimento foi utilizado neste projeto o linter `ESLint`.

Você pode também instalar o plugin do `ESLint` no `VSCode`, basta ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## Banco de Dados

O banco de dados utilizado é relacional e foi utilizado o MySQL.

### Tabelas

O banco possui três tabelas: Dates, Districts e Climates.

Os campos da tabela `Dates` possuem esse formato:

```json
{ "date_id": 1, "date_name": "DD/MM", "district_id": 1 }
```

A resposta do insert que deve retornar após a criação é parecida com essa:

```json
{ "dateId": 1, "dateName": "DD/MM", "districtId": 1 }
```

(O dateId será gerado automaticamente)

Os campos da tabela `Districts` possuem esse formato:

```json
{ "district_id": 1, "district_name": "Example" }
```

A resposta do insert que deve retornar após a criação é parecida com essa:

```json
{ "districtId": 1, "districtName": "Example" }
```

(O districtId será gerado automaticamente)

Os campos da tabela `Climates` possuem esse formato:

```json
{ "climate_id": 1, "climate_hour": 0, "climate_rain": 0.0, "date_id": 1 }
```

A resposta do insert que deve retornar após a criação é parecida com essa:

```json
{ "climateIid": 1, "climateHour": 0, "climateRain": 0.0, "dateId": 1 }
```

(O climateIid será gerado automaticamente)

## Desenvolvimento

Neste projeto as seguintes stacks foram utilizadas no desenvolvimento:

- [Node.js](https://nodejs.org/en/docs/)

- [Express.js](https://expressjs.com/pt-br/)

- [Node MySQL 2](https://www.npmjs.com/package/mysql2)

- [Joi](https://joi.dev/api/?v=17.4.2)

- [Express Rescue](https://www.npmjs.com/package/express-rescue)

- [Cors](https://www.npmjs.com/package/cors)

- [Dotenv](https://www.npmjs.com/package/dotenv)

- [Nodemon](https://www.npmjs.com/package/nodemon)

---

# Padrões e Conexões

## Endpoints da API

### https://desafio-nimbus-backend.herokuapp.com/dates

- Método GET:

O retorno da API será:

```json
{
  dates: [
    {
      "dateId": 1,
      "dateName": "DD/MM",
      "districtId": 1
    },
    ...
  ],
}
```

- Método POST:

O endpoint deve receber a seguinte estrutura:

```json
{
  "dateName": "product_name",
  "districtId": "product_quantity"
}
```

  - `dateName` deve ser uma _string_ com 5 caracteres;
  - `districtId` deve ser um ID existente de um bairro cadastrado na tabela Districts.

O retorno da API em caso de sucesso será:

```json
{
  "dateId": 1,
  "dateName": "DD/MM",
  "districtId": 1
}
```

### https://desafio-nimbus-backend.herokuapp.com/dates/:id

- Método GET

O retorno da API em caso de sucesso será:

```json
{
  "dateId": 1,
  "dateName": "DD/MM",
  "districtId": 1
}
```

### https://desafio-nimbus-backend.herokuapp.com/districts

- Método GET

O retorno da API será:

```json
{
  districts: [
    {
      "districtId":5,
      "districtName":"Copacabana",
      "state":"RJ"
    },
    ...
  ],
}
```

- Método POST

O endpoint deve receber a seguinte estrutura:

```json
[
  {
    "districtName":"Copacabana",
    "state":"RJ"
  }
  ...
]
```

  - `districtName` e `state` devem ser strings.

O retorno da API em caso de sucesso será:

```json
{
  {
    "districtId":5,
    "districtName":"Copacabana",
    "state":"RJ"
  }
}
```

### https://desafio-nimbus-backend.herokuapp.com/districts/:id

- Método GET

O retorno da API em caso de sucesso será:

```json
{
  "districtId":5,
  "districtName":"Copacabana",
  "state":"RJ"
}
```

### https://desafio-nimbus-backend.herokuapp.com/climates

- Método GET

O retorno da API será:

```json
{
  climates: [
    {
      "climateId": 5,
      "climateHour": 0,
      "climateRain": 0.1,
      "dateId": 85
    },
    ...
  ],
}
```

- Método POST

O endpoint deve receber a seguinte estrutura:

```json
[
  {
    "climateHour": 0,
    "climateRain": 0.1,
    "dateId": 85
  }
  ...
]
```

  - `climateHour` deve ser um número inteiro entre 0 e 23;
  - `climateRain` deve ser um número maior que 0;
  - `dateId` deve ser o ID da uma data cadastrada na tabela `Dates`.

O retorno da API em caso de sucesso será:

```json
{
  {
    "climateId": 5,
    "climateHour": 0,
    "climateRain": 0.1,
    "dateId": 85
  }
}
```

### https://desafio-nimbus-backend.herokuapp.com/districts/:id

- Método GET

O retorno da API em caso de sucesso será:

```json
{
  "districtId":5,
  "districtName":"Copacabana",
  "state":"RJ"
}
```

## Mensagens de erro

Em caso de algum erro ocorrer durante alguma requisição, a API retorna o status HTTP adequado e o body no seguinte padrão:
`{ err: { message: 'Dados inválidos', code: <código do erro> } }`.

---
