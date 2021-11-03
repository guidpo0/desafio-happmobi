### Informações Gerais

Projeto desenvolvido para processo seletivo da Happmobi.

---

# Boas vindas ao repositório de Back-End do projeto!

Neste projeto foi desenvolvida uma API utilizando a arquitetura MSC (Model, Service, Controller) aplicando os padrões RESTful. A API trata-se de registros de usuários, carros e de aluguéis que serão utilizados para gerenciar um site de aluguel de carros.

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
    `JWT_SECRET`: senha que será utilizada na validação com JWT
    `DB_DATABASE=heroku_c59813370649050`
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

O banco possui quatro tabelas: Users, Address, Rents e Cars.

Os campos da tabela `Users` possuem esse formato:

```json
{
  "user_id": 1,
  "user_email": "email@email.com",
  "user_password": "password",
  "user_role": "admin ou user",
  "first_name": "first",
  "last_name": "last",
  "phone": "11 98485-4845",
  "address_id": 1
}
```

Os campos da tabela `Address` possuem esse formato:

```json
{
  "address_id": 1,
  "street": "street",
  "city": "city",
  "zip": "zip"
}
```

Os campos da tabela `Rents` possuem esse formato:

```json
{
  "rent_id": 1,
  "car_id": 1,
  "user_id": 1,
  "rent_start": "YYYY/MM/DD HH:MM",
  "rent_end": "YYYY/MM/DD HH:MM",
  "total": 100
}
```

Os campos da tabela `Cars` possuem esse formato:

```json
{
  "car_id": 1,
  "car_model": "some car",
  "cost_hour": 10,
  "rent_available": true || false
}
```

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

- [Sucrase](https://www.npmjs.com/package/sucrase)

- [JWT](https://www.npmjs.com/package/jsonwebtoken)

- [MySQL](https://www.npmjs.com/package/mysql2)

- [TypeScript](https://www.npmjs.com/package/typescript)

---

# Padrões e Conexões

## Endpoints da API

### https://desafio-happmobi-backend.herokuapp.com/cars

- Método GET:

O retorno da API será:

```json
{
  cars: [
    {
      "carId": 1,
      "carModel": "some car",
      "costHour": 10,
      "rentAvailable": true || false
    },
    ...
  ],
}
```

- Método POST:

O body enviado na requisição deve receber a seguinte estrutura:

```json
{
  "carModel": "some car",
  "costHour": 10,
  "rentAvailable": true || false
}
```

  - `carModel` deve ser uma _string_;
  - `costHour` deve ser um _number_ maior que 0;
  - `rentAvailable` deve ser um _boolean_.

O usuário logado deve ser 'admin' e o headers enviado na requisição deve receber a seguinte estrutura:

```json
{
  "Authorization": token,
}
```

O retorno da API em caso de sucesso será:

```json
{
  "carId": 1,
  "carModel": "some car",
  "costHour": 10,
  "rentAvailable": true || false
}
```

### https://desafio-happmobi-backend.herokuapp.com/cars/:id

- Método GET

O retorno da API em caso de sucesso será:

```json
{
  "carId": 1,
  "carModel": "some car",
  "costHour": 10,
  "rentAvailable": true || false
}
```

- Método PUT:

O carro respectivo ao id passado deve existir e não estar em uso e o body enviado na requisição deve receber a seguinte estrutura:

```json
{
  "carModel": "some car",
  "costHour": 10,
  "rentAvailable": true || false
}
```

  - `carModel` deve ser uma _string_;
  - `costHour` deve ser um _number_ maior que 0;
  - `rentAvailable` deve ser um _boolean_.

O usuário logado deve ser 'admin' e o headers enviado na requisição deve receber a seguinte estrutura:

```json
{
  "Authorization": token,
}
```

O retorno da API em caso de sucesso será:

```json
{
  "carId": 1,
  "carModel": "some car",
  "costHour": 10,
  "rentAvailable": true || false
}
```

- Método DELETE:

O carro respectivo ao id passado deve existir e não estar em uso.

O usuário logado deve ser 'admin' e o headers enviado na requisição deve receber a seguinte estrutura:

```json
{
  "Authorization": token,
}
```

O retorno da API em caso de sucesso será:

```json
{
  "carId": 1,
  "carModel": "some car",
  "costHour": 10,
  "rentAvailable": true || false
}
```

### https://desafio-happmobi-backend.herokuapp.com/rents

- Método GET:

O retorno da API será:

```json
{
  rents: [
    {
      "rentId": 1,
      "carId": 1,
      "userId": 1,
      "rentStart": "YYYY/MM/DD HH:MM",
      "rentEnd": "YYYY/MM/DD HH:MM",
      "total": 100
    },
    ...
  ],
}
```

- Método POST:

O body enviado na requisição deve receber a seguinte estrutura:

```json
{
  "carId": 1,
  "rentStart": "YYYY/MM/DD HH:MM",
  "rentEnd": "YYYY/MM/DD HH:MM",
}
```

  - `carId` deve ser um _number_;
  - `rentStart` deve ser uma _string_ no formato indicado;
  - `rentEnd` deve ser uma _string_ no formato indicado;

O usuário logado deve ser 'admin' e o headers enviado na requisição deve receber a seguinte estrutura:

```json
{
  "Authorization": token,
}
```

O retorno da API em caso de sucesso será:

```json
{
  "rentId": 1,
  "carId": 1,
  "userId": 1,
  "rentStart": "YYYY/MM/DD HH:MM",
  "rentEnd": "YYYY/MM/DD HH:MM",
  "total": 100
}
```

### https://desafio-happmobi-backend.herokuapp.com/rents/:id

- Método GET

O retorno da API em caso de sucesso será:

```json
{
  "rentId": 1,
  "carId": 1,
  "userId": 1,
  "rentStart": "YYYY/MM/DD HH:MM",
  "rentEnd": "YYYY/MM/DD HH:MM",
  "total": 100
}
```

- Método PUT:

O carro respectivo ao carId passado deve existir e não estar em uso e o body enviado na requisição deve receber a seguinte estrutura:

```json
{
  "carId": 1,
  "rentStart": "YYYY/MM/DD HH:MM",
  "rentEnd": "YYYY/MM/DD HH:MM",
}
```

  - `carId` deve ser um _number_;
  - `rentStart` deve ser uma _string_ no formato indicado;
  - `rentEnd` deve ser uma _string_ no formato indicado;

O usuário logado deve ser 'admin' e o headers enviado na requisição deve receber a seguinte estrutura:

```json
{
  "Authorization": token,
}
```

O retorno da API em caso de sucesso será:

```json
{
  "rentId": 1,
  "carId": 1,
  "userId": 1,
  "rentStart": "YYYY/MM/DD HH:MM",
  "rentEnd": "YYYY/MM/DD HH:MM",
  "total": 100
}
```

- Método DELETE:

O usuário logado deve ser 'admin' e o headers enviado na requisição deve receber a seguinte estrutura:

```json
{
  "Authorization": token,
}
```

O retorno da API em caso de sucesso será:

```json
{
  "rentId": 1,
  "carId": 1,
  "userId": 1,
  "rentStart": "YYYY/MM/DD HH:MM",
  "rentEnd": "YYYY/MM/DD HH:MM",
  "total": 100
}
```

### https://desafio-happmobi-backend.herokuapp.com/users

- Método GET:

O retorno da API será:

```json
{
  rents: [
    {
     "userId": 1,
      "userEmail": "email@email.com",
      "userRole": "admin ou user",
      "firstName": "first",
      "lastName": "last",
      "phone": "11 98485-4845",
      "street": "street",
      "city": "city",
      "zip": "zip"
    },
    ...
  ],
}
```

- Método POST:

O body enviado na requisição deve receber a seguinte estrutura:

```json
{
  "userId": 1,
  "userEmail": "email@email.com",
  "userPassword": "password",
  "userRole": "admin ou user",
  "firstName": "first",
  "lastName": "last",
  "phone": "11 98485-4845",
  "street": "street",
  "city": "city",
  "zip": "zip"
}
```

  - `userId` deve ser um _number_;
  - `userEmail` deve ser uma _string_;
  - `userPassword` deve ser uma _string_;
  - `userRole` deve ser 'admin' ou 'user';
  - `firstName` deve ser uma _string_;
  - `lastName` deve ser uma _string_;
  - `phone` deve ser uma _string_;
  - `street` deve ser uma _string_;
  - `city` deve ser uma _string_;
  - `zip` deve ser uma _string_.

O usuário logado deve ser 'admin' e o headers enviado na requisição deve receber a seguinte estrutura:

```json
{
  "Authorization": token,
}
```

O retorno da API em caso de sucesso será:

```json
{
  "userId": 1,
  "userEmail": "email@email.com",
  "userRole": "admin ou user",
  "firstName": "first",
  "lastName": "last",
  "phone": "11 98485-4845",
  "street": "street",
  "city": "city",
  "zip": "zip"
}
```

### https://desafio-happmobi-backend.herokuapp.com/users/:id

- Método GET

O retorno da API em caso de sucesso será:

```json
{
  "userId": 1,
  "userEmail": "email@email.com",
  "userRole": "admin ou user",
  "firstName": "first",
  "lastName": "last",
  "phone": "11 98485-4845",
  "street": "street",
  "city": "city",
  "zip": "zip"
}
```

- Método PUT:

O body enviado na requisição deve receber a seguinte estrutura:

```json
{
  "userId": 1,
  "userEmail": "email@email.com",
  "userPassword": "password",
  "userRole": "admin ou user",
  "firstName": "first",
  "lastName": "last",
  "phone": "11 98485-4845",
  "street": "street",
  "city": "city",
  "zip": "zip"
}
```

  - `userId` deve ser um _number_;
  - `userEmail` deve ser uma _string_;
  - `userPassword` deve ser uma _string_;
  - `userRole` deve ser 'admin' ou 'user';
  - `firstName` deve ser uma _string_;
  - `lastName` deve ser uma _string_;
  - `phone` deve ser uma _string_;
  - `street` deve ser uma _string_;
  - `city` deve ser uma _string_;
  - `zip` deve ser uma _string_.

O headers enviado na requisição deve receber a seguinte estrutura:

```json
{
  "Authorization": token,
}
```

O retorno da API em caso de sucesso será:

```json
{
  "userId": 1,
  "userEmail": "email@email.com",
  "userRole": "admin ou user",
  "firstName": "first",
  "lastName": "last",
  "phone": "11 98485-4845",
  "street": "street",
  "city": "city",
  "zip": "zip"
}
```

- Método DELETE:

O usuário logado deve ser 'admin' e o headers enviado na requisição deve receber a seguinte estrutura:

```json
{
  "Authorization": token,
}
```

O retorno da API em caso de sucesso será:

```json
{
  "userId": 1,
  "userEmail": "email@email.com",
  "userRole": "admin ou user",
  "firstName": "first",
  "lastName": "last",
  "phone": "11 98485-4845",
  "street": "street",
  "city": "city",
  "zip": "zip"
}
```

### https://desafio-happmobi-backend.herokuapp.com/login

- Método POST:

O body enviado na requisição deve receber a seguinte estrutura:

```json
{
  "userEmail": "email@email.com",
  "userPassword": "password",
}
```

  - `userEmail` deve ser uma _string_ e um email cadastrado;
  - `userPassword` deve ser uma _string_ e senha cadastrada para o email;


O retorno da API em caso de sucesso será:

```json
{
  "token": "token",
}
```

---

## Mensagens de erro

Em caso de algum erro ocorrer durante alguma requisição, a API retorna o status HTTP adequado e o body no seguinte padrão:
`{ err: { message: 'Dados inválidos', code: <código do erro> } }`.

---
