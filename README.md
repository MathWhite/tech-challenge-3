# 📝 Blog FIAP - Tech Challenge 3

## 📚 Descrição

Sistema de blog desenvolvido em React para professores criarem e gerenciarem posts educacionais com autenticação, CRUD completo e integração com API REST.

## ✨ Funcionalidades

- **Home**: Lista de posts com busca por palavras-chave
- **Leitura**: Visualização de posts com suporte a Markdown
- **Autenticação**: Login para professores e alunos
- **CRUD Posts**: Criação, edição e exclusão (professores)
- **Admin**: Painel de gerenciamento de posts
- **Responsivo**: Interface adaptável a dispositivos móveis

## 🚀 Tecnologias

- **React 19** - Framework principal
- **Vite 7** - Build tool e dev server
- **React Router Dom 7** - Roteamento e proteção de rotas
- **Styled Components 6** - CSS-in-JS
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificações
- **React Markdown** - Renderização de conteúdo
- **React Hook Form + Yup** - Formulários e validação

## 🏗️ Arquitetura

```
src/
├── api/                # Integração com backend
│   ├── axios.js        # Configuração HTTP
│   └── posts.js        # Endpoints de posts
├── components/         # Componentes reutilizáveis
│   ├── Navigation.jsx  # Header de navegação
│   └── PostCard.jsx    # Card de post
├── contexts/           # Estado global
│   └── AuthContext.jsx # Autenticação
├── pages/              # Páginas (rotas)
│   ├── Home.jsx        # Lista de posts
│   ├── Login.jsx       # Autenticação
│   ├── PostRead.jsx    # Visualização de post
│   ├── PostCreate.jsx  # Criação de posts
│   ├── PostEdit.jsx    # Edição de posts
│   └── Admin.jsx       # Painel administrativo
├── styles/             # Estilos globais
│   └── GlobalStyle.js  # Reset CSS + variáveis
├── App.jsx             # Componente raiz + roteamento
└── main.jsx            # Ponto de entrada
```

## 📦 Setup Inicial

### ✅ Pré-requisitos
- Node.js 20+
- npm 8+
- Docker (opcional)

### 💻 Instalação Local

```bash
# Clone do repositório
git clone https://github.com/MathWhite/tech-challenge-3
cd tech-challenge-3

# Instalação de dependências
npm install

# Configuração de ambiente
cp .env.example .env

# Execução em desenvolvimento
npm run dev
# Acesso: http://localhost:5173

# Build de produção
npm run build
npm run preview
# Acesso: http://localhost:4173
```

### 🐳 Docker

```bash
# Desenvolvimento (com hot reload)
npm run docker:dev
# Acesso: http://localhost:3000

# Produção (com Nginx)
npm run docker:prod
# Acesso: http://localhost:8080
```

## 🔧 Scripts

```bash
# Desenvolvimento
npm run dev              # Servidor desenvolvimento
npm run build            # Build produção
npm run preview          # Preview do build
npm run lint             # Linting ESLint
npm run format           # Formatação Prettier

# Testes
npm run test             # Testes unitários
npm run test:ui          # Interface gráfica
npm run test:coverage    # Relatório cobertura

# Docker
npm run docker:dev       # Ambiente desenvolvimento
npm run docker:prod      # Ambiente produção
npm run docker:clean     # Limpar containers
```

## 🔗 Integração com API

**Base URL**: `https://tech-challenge-edn9.onrender.com`

### 📂 Endpoints
- `GET /posts` - Listar posts
- `GET /posts/:id` - Obter post específico
- `POST /posts` - Criar post (requer auth)
- `PUT /posts/:id` - Atualizar post (requer auth)
- `DELETE /posts/:id` - Deletar post (requer auth)
- `GET /posts/search?q=termo` - Buscar posts

### 🔐 Autenticação
Credenciais de teste:
- **Professor**: `professor` / `1234`
- **Aluno**: `aluno` / `1234`

## 📖 Guia de Uso

### ⚡ Desenvolvimento
1. Clone o repositório
2. Execute `npm install`
3. Configure `.env` com a URL da API
4. Execute `npm run dev`
5. Acesse `http://localhost:5173`

### 🚀 Produção
```bash
npm run build
npm run preview
```

### 🐳 Docker
```bash
# Desenvolvimento
docker-compose up app-dev --build

# Produção  
docker-compose up app-prod --build
```

## 🛣️ Estrutura de Rotas

- `/` - Lista de posts (público)
- `/post/:id` - Visualização de post (público)
- `/login` - Autenticação
- `/create` - Criar post (protegida)
- `/edit/:id` - Editar post (protegida)
- `/admin` - Painel admin (protegida)

## 📹 Apresentação

Vídeo demonstrando:
- Objetivo da aplicação
- Uso prático do blog
- Funcionamento do Docker
- Testes, CI e CD funcionando

[Acesse o video aqui (Google Drive)](Em desenvolvimento)

## 📄 Render

Acesse o projeto em PRD através do Render.

```bash
BaseUrl: https://tech-challenge-3-03uj.onrender.com
```

## 🤝 Colaborador

- Matheus Carvalho

## 📄 Documentação Técnica Complementar

Documentações adicionais exigidas pelo Tech Challenge estão disponíveis na pasta [`/src/docs`](./src/docs), incluindo:

- [`relato.md`](./src/docs/relato.md) – Relato de experiências, aprendizados e desafios enfrentados durante o desenvolvimento


## 🏁 Conclusão

Este projeto foi desenvolvido com foco em entregar uma solução real e escalável para professores da rede pública, aplicando práticas modernas de desenvolvimento, testes e documentação.

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.