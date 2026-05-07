# 🐾 GetAPet

Aplicação full-stack para adoção de pets, desenvolvida com React no frontend e Node.js com Express no backend. Permite cadastro de usuários, publicação de pets para adoção, agendamento de visitas e gerenciamento completo do processo de adoção.

## 📸 Screenshots

### Tela Inicial
![Tela Inicial](https://github.com/user-attachments/assets/7a525b3f-92c5-49ce-94ab-78c8e226198b)

### Cadastro
![Cadastro](https://github.com/user-attachments/assets/37985fa5-63d9-4de2-bbfd-f5129fd9ecb5)

### Detalhes do Pet
![Detalhes do Pet](https://github.com/user-attachments/assets/995babbc-b2dc-40b5-970d-3cc71d0cc8ae)

### Cadastrando Pet
![Cadastrando Pet](https://github.com/user-attachments/assets/57bb4343-3514-43c5-b510-3c67aece71c0)

### Perfil do Usuário
![Perfil do Usuário](https://github.com/user-attachments/assets/67fa0b64-5b07-44a1-8538-323f0553fba5)

## ⚙️ Funcionalidades

- Cadastro e autenticação de usuários com JWT
- Listagem de pets disponíveis para adoção
- Cadastro de pets com upload de imagens
- Visualização de detalhes do pet
- Agendamento de visita para adoção
- Conclusão do processo de adoção
- Edição de perfil do usuário
- Gerenciamento dos pets cadastrados e adoções

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) rodando localmente

### Backend

```bash
# Acesse a pasta
cd backend

# Instale as dependências
npm install

# Crie o arquivo .env baseado no .env.example
# e defina o valor de JWT_SECRET

# Inicie o servidor
node index.js
```

O backend roda em: [http://localhost:5000](http://localhost:5000)

### Frontend

```bash
# Acesse a pasta
cd frontend

# Instale as dependências
npm install

# Crie o arquivo .env.local baseado no .env.example
# com REACT_APP_API=http://localhost:5000/

# Inicie a aplicação
npm start
```

O frontend roda em: [http://localhost:3000](http://localhost:3000)

## 🛠️ Tecnologias

- **React** — interface do usuário
- **Node.js** — runtime JavaScript
- **Express** — framework web
- **Mongoose** — ODM para MongoDB
- **MongoDB** — banco de dados NoSQL
- **JWT** — autenticação por token
- **Multer** — upload de imagens
- **Bcrypt** — criptografia de senhas
- **Nodemon** — reload automático em desenvolvimento
- **Postman** — testes das rotas da API
- **MVC** — arquitetura do projeto
