# 📝 Blog FIAP - Tech Challenge 3

Sistema de blog desenvolvido em React para professores criarem e gerenciarem posts educacionais.

## 🚀 Funcionalidades Implementadas

### ✅ Requisitos Funcionais Atendidos

1. **Página Principal (Lista de posts)**
   - ✅ Lista todos os posts disponíveis
   - ✅ Exibe título, autor e breve descrição
   - ✅ Campo de busca para filtrar posts por palavras-chave
   - ✅ Design responsivo e navegação intuitiva

2. **Página de Leitura de Post**
   - ✅ Exibe conteúdo completo do post
   - ✅ Suporte a Markdown para formatação
   - ✅ Sistema de comentários funcional
   - ✅ Navegação de volta para a página principal

3. **Página de Criação de Postagens**
   - ✅ Formulário para docentes criarem posts
   - ✅ Campos: título, conteúdo (Markdown) e autor
   - ✅ Validação de formulário
   - ✅ Feedback visual com notificações

4. **Página de Edição de Postagens**
   - ✅ Formulário para editar posts existentes
   - ✅ Carrega dados atuais do post
   - ✅ Validação e feedback de sucesso/erro

5. **Página Administrativa**
   - ✅ Lista todas as postagens
   - ✅ Botões para editar e excluir posts
   - ✅ Modal de confirmação para exclusão
   - ✅ Interface limpa e funcional

6. **Autenticação e Autorização**
   - ✅ Sistema de login para professores
   - ✅ Proteção de rotas sensíveis
   - ✅ Controle de acesso baseado em autenticação
   - ✅ Logout funcional

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca principal
- **React Router Dom 7** - Roteamento
- **Styled Components** - Estilização
- **Axios** - Requisições HTTP
- **React Hot Toast** - Notificações
- **React Markdown** - Renderização de Markdown
- **Vite** - Bundler e dev server

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 20+ 
- npm ou yarn

### Passos para rodar o projeto

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd tech-challenge-3
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env conforme necessário
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

## 🔐 Credenciais de Teste

Para acessar o sistema:
- **Professor:** professor / 1234 (acesso completo)
- **Aluno:** aluno / 1234 (apenas visualização)

## 🌐 Integração com Backend

O projeto está **integrado com a API real**:
- **URL Base:** https://tech-challenge-edn9.onrender.com
- **Autenticação:** Bearer tokens JWT
- **Token Professor:** Automático no login
- **Token Aluno:** Automático no login

### Tokens Utilizados:
- **Professor:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHJvZmVzc29yIiwibmFtZSI6Ik1hdGhldXMiLCJpYXQiOjE3NTI2NjgzMzZ9.BQUrflZw8QktIBmqOVWiPvu0jDowJl_-SiBr9yCyPv0`
- **Aluno:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWx1bm8iLCJuYW1lIjoiTWF0aGV1cyIsImlhdCI6MTc1MjY2ODMzNn0.G6i94pkpNQQ5o-7pLpmNdSMbj1FfWpoBYn2U0oMBusU`

## 📱 Estrutura das Páginas

### Páginas Públicas
- `/` - Página inicial com lista de posts
- `/post/:id` - Leitura de post individual
- `/login` - Página de login

### Páginas Protegidas (Requer Login)
- `/admin` - Painel administrativo
- `/create` - Criação de novos posts
- `/edit/:id` - Edição de posts existentes

## 🎨 Features Adicionais

- **Interface Responsiva** - Funciona em desktop e mobile
- **Navegação Intuitiva** - Header com links contextuais
- **Feedback Visual** - Notificações toast para ações
- **Validação de Formulários** - Campos obrigatórios e validações
- **Loading States** - Indicadores de carregamento
- **Error Handling** - Tratamento de erros elegante
- **Markdown Support** - Posts suportam formatação Markdown
- **Comentários** - Sistema básico de comentários

## 🔧 Scripts Disponíveis

```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Gera build de produção
npm run preview    # Preview do build de produção
npm run lint       # Executa o linting do código
```

## 📂 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navigation.jsx   # Header de navegação
│   └── PostCard.jsx     # Card de post para listagem
├── contexts/            # Contexts do React
│   └── AuthContext.jsx  # Gerenciamento de autenticação
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── Login.jsx       # Página de login
│   ├── PostRead.jsx    # Leitura de post
│   ├── PostCreate.jsx  # Criação de post
│   ├── PostEdit.jsx    # Edição de post
│   └── Admin.jsx       # Painel administrativo
├── api/                # Configurações de API
│   ├── axios.js        # Configuração do Axios
│   └── posts.js        # Endpoints dos posts
├── styles/             # Estilos globais
│   └── GlobalStyle.js  # Reset CSS e estilos base
├── App.jsx             # Componente principal
└── main.jsx           # Ponto de entrada
```

## 🔄 Integração com Backend

O projeto está **CONECTADO COM A API REAL**:

**URL da API:** https://tech-challenge-edn9.onrender.com

**Endpoints Implementados:**
```
GET    /posts           # ✅ Listar posts
GET    /posts/:id       # ✅ Obter post específico  
POST   /posts           # ✅ Criar novo post
PUT    /posts/:id       # ✅ Atualizar post
DELETE /posts/:id       # ✅ Deletar post
GET    /posts/search?q= # ✅ Buscar posts
```

**Autenticação:**
- Sistema JWT Bearer Token
- Interceptors automáticos no Axios
- Diferenciação entre Professor e Aluno
- Proteção de rotas baseada em roles

## 🚀 Deploy

Para fazer deploy em produção:

1. **Build do projeto**
```bash
npm run build
```

2. **Deploy da pasta `dist`** para seu provedor preferido (Vercel, Netlify, etc.)

## 🐛 Troubleshooting

### Erro de versão do Node.js
Se encontrar erros relacionados à versão do Node.js:
```bash
# Use Node.js 20+
nvm install 20
nvm use 20
```

### Erro de dependências
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

## 📝 Próximos Passos

- [ ] Integração com backend real
- [ ] Autenticação JWT
- [ ] Upload de imagens
- [ ] Sistema de categorias
- [ ] Paginação
- [ ] Comentários com autenticação
- [ ] Editor WYSIWYG
- [ ] Busca avançada

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido seguindo as melhores práticas:
- Componentes funcionais com Hooks
- Context API para gerenciamento de estado
- Styled Components para estilização
- Estrutura modular e organizizada
- Tratamento adequado de erros
- Loading states e feedback do usuário
