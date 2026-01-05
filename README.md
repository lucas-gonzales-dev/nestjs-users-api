# NestJS Users API

Sistema de gerenciamento de usuários com autenticação JWT desenvolvido para o desafio de API REST da DNC.

## Sobre

API RESTful para gerenciamento de usuários. Permite criar, listar, atualizar e remover usuários com autenticação JWT para proteção das rotas. Desenvolvida com NestJS, TypeORM e MySQL.

## Tecnologias

- NestJS
- TypeORM
- MySQL
- Passport.js / JWT
- bcrypt

## Modelagem do Banco de Dados

```
┌──────────────────────┐
│        USERS         │
├──────────────────────┤
│ id (PK)              │
│ name                 │
│ username (unique)    │
│ email (unique)       │
│ password (hash)      │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘
```

## Como usar

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd RID99751_Desafio_Desenvolva_uma_API_REST_com_NestJs
npm install
```

Crie o banco de dados MySQL:

```sql
CREATE DATABASE nestjs_api;
```

Configure o arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=nestjs_api
JWT_SECRET=sua_chave_secreta
PORT=3000
```

Inicie o servidor:

```bash
npm run start:dev
```

Acesse http://localhost:3000 para verificar se a API está rodando.

## Estrutura

```
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   └── login.dto.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── app.module.ts
│   └── main.ts
├── .env.example
├── package.json
└── README.md
```

## API Endpoints

### Autenticação

| Método | Rota          | Descrição        | Auth |
| ------ | ------------- | ---------------- | ---- |
| POST   | /auth/login   | Login do usuário | Não  |

### Usuários

| Método | Rota       | Descrição              | Auth |
| ------ | ---------- | ---------------------- | ---- |
| POST   | /users     | Cadastra novo usuário  | Não  |
| GET    | /users     | Lista todos os usuários| JWT  |
| GET    | /users/:id | Busca usuário por ID   | JWT  |
| PUT    | /users/:id | Atualiza usuário       | JWT  |
| DELETE | /users/:id | Remove usuário         | JWT  |

## Autenticação JWT

Para acessar rotas protegidas, inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

## Funcionalidades

- Cadastro de usuários com validação de dados
- Criptografia de senhas com bcrypt
- Autenticação via JWT com tempo de expiração
- CRUD completo de usuários
- Proteção de rotas com guards
- Validação de username e email únicos

## Autor

Lucas Gonzales
