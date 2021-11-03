### Informações Gerais

Projeto desenvolvido para processo seletivo da Happmobi.

[Aplicação](https://desafio-happmobi-frontend.herokuapp.com/)

---

# Boas vindas ao repositório de Front-End do projeto!

Essa aplicação permite ao usuário fazer simulações de aluguel de carro e também ver os carros já alugados, também permite ao administrador do site editar, adiocionar e excluir carros do banco de dados.

Lembrando que esta aplicação corresponde aos meus esforços para melhorar minhas hard skills e soft skills sinta-se à vontade para explorá-la! Feedbacks construtivos são sempre bem vindos!

Abaixo você poderá encontrar mais informações técnicas sobre este projeto.

---

# Sumário

- [Habilidades](#habilidades)
- [Instruções para rodar o projeto localmente](#instruções-para-rodar-o-projeto-localmente)
- [Informações do projeto](#informações-do-projeto)
  - [ESLint](#eslint)
  - [API](#api)
  - [Stacks](#stacks)
  - [Rotas](#rotas)
  - [Local Storage](#local-storage)

---

# Habilidades

Nesse projeto, fui capaz de:

  - Utilizar Angular para componentizar a aplicação
  - Construir uma SPA com rotas definidas
  - Utilizar o Ngrx para gerenciamento de estado
  - Fazer a estilização do app de modo responsivo

---

# Instruções para rodar o projeto localmente

1. Faça o fork e o clone do repositório

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Faça o build do projeto:
    * `npm run build`
  * Inicie o projeto:
    * `npm start`

---

# Informações do projeto

## ESLint

Para garantir a qualidade do código de forma a tê-lo mais legível, de mais fácil manutenção e seguindo as boas práticas de desenvolvimento foi utilizado neste projeto o linter `ESLint`.

## API

Para acessar os dados necessários foi utilizada uma API construída para este projeto. [Documentação da API](https://github.com/guidpo0/desafio-happmobi/tree/main/back-end).

## Stacks

Neste projeto foi utilizado Angular, HTML, CSS e TypeScript.

## Rotas

As rotas utilizadas na aplicação são as seguintes:

* Landing Page: `/`;
* Página de Login: `/login`;
* Criar usuário: `/register`;
* Tela de Perfil (deve estar logado): `/profile`;
* Tela de Carros Disponíveis (deve estar logado): `/cars-available`;
* Tela de alugueis (deve estar logado): `/rents`;
* Tela de Simulação de aluguel (deve estar logado): `/simulate/{carId}`;
* Tela do Administrador (deve estar logado como admin): `/admin`;

## Local Storage

O uso de `localStorage` é necessário para realizar a validação do usuário logado.

Para valor `token` é salvo no `localStorage` do navegador após o login.

---
