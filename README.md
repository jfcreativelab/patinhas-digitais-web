# 🐾 MELHOR AMIGO - Pet Shop E-commerce

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Site completo e profissional para pet shop com sistema de carrinho de compras e checkout integrado**

[🚀 Demo](#) • [📖 Documentação](#-tecnologias) • [💻 Desenvolvimento](#-instalação)

</div>

---

## 📋 Índice

- [✨ Funcionalidades](#-funcionalidades)
- [🎯 Destaques](#-destaques)
- [🛠️ Tecnologias](#️-tecnologias)
- [🚀 Instalação](#-instalação)
- [📱 Seções do Site](#-seções-do-site)
- [🛒 Sistema de Carrinho](#-sistema-de-carrinho)
- [💳 Checkout](#-checkout)
- [🎨 Design](#-design)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Scripts](#-scripts)
- [🎁 Cupons](#-cupons-de-desconto)
- [📸 Screenshots](#-screenshots)

---

## ✨ Funcionalidades

### 🏠 Homepage Moderna
- **Hero Section** com animações e call-to-action
- **Navegação suave** entre seções
- **Menu responsivo** para mobile
- **Scroll to top** automático

### 🛍️ Sistema de Carrinho Completo
- ✅ Adicionar/remover produtos
- ✅ Gerenciamento de quantidades (+/-)
- ✅ **Sistema de cupons de desconto**
- ✅ **Persistência no localStorage** (carrinho salvo automaticamente)
- ✅ Cálculo automático de frete grátis (acima de R$ 200)
- ✅ Animações suaves e feedback visual
- ✅ Resumo do pedido em tempo real

### 💳 Checkout Profissional
- ✅ **Formulário em 3 etapas** com indicador de progresso
- ✅ **Busca automática de CEP** via API ViaCEP
- ✅ Múltiplos métodos de pagamento:
  - 💳 Cartão de Crédito
  - 💳 Cartão de Débito
  - 🎁 **PIX com 5% de desconto**
- ✅ Validação completa de formulários
- ✅ Feedback visual em cada etapa
- ✅ Resumo do pedido fixo na lateral

### 🎨 Design e UX
- ✅ Interface moderna e profissional
- ✅ **100% Responsivo** (Mobile, Tablet, Desktop)
- ✅ Animações suaves e microinterações
- ✅ Paleta de cores azul personalizada
- ✅ Componentes Shadcn/ui
- ✅ Dark mode ready (estrutura preparada)

---

## 🎯 Destaques

### 🚀 Performance
- ⚡ Build otimizado com Vite
- 📦 Code splitting automático
- 🖼️ Lazy loading de imagens
- 🎯 Componentes otimizados

### 🎨 Experiência do Usuário
- 🎭 Animações fluidas
- 📱 Design mobile-first
- 🔔 Notificações toast elegantes
- 🎯 Feedback visual em todas as ações

### 🔒 Funcionalidades Técnicas
- 💾 Persistência de dados (localStorage)
- 🔄 Gerenciamento de estado (Context API)
- ✅ Validação de formulários
- 🌐 Integração com APIs externas (ViaCEP)

---

## 🛠️ Tecnologias

### Core
- **[React 18.3.1](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[TypeScript 5.5.3](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem
- **[Vite 5.4.1](https://vitejs.dev/)** - Build tool e dev server ultra-rápido

### Estilização
- **[Tailwind CSS 3.4.11](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes React de alta qualidade
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones moderna

### Funcionalidades
- **[React Router 6.26.2](https://reactrouter.com/)** - Roteamento SPA
- **[Sonner](https://sonner.emilkowal.ski/)** - Sistema de notificações toast
- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de estado servidor

### Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linter para qualidade de código
- **[TypeScript ESLint](https://typescript-eslint.io/)** - Linter específico para TS

---

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/melhor-amigo-petshop.git
cd melhor-amigo-petshop

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:8080
```

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Preview do build
npm run preview
```

---

## 📱 Seções do Site

### 1. 🏠 Hero Section
- Apresentação principal com call-to-action
- Estatísticas animadas
- Botões de navegação

### 2. 🎯 Serviços
- Cards de serviços oferecidos
- Hover effects elegantes
- Links funcionais para contato

### 3. 🛍️ Produtos
- Catálogo completo de produtos
- Filtros por categoria (Cachorros, Gatos, Acessórios)
- Cards interativos com hover
- Botão "Adicionar ao Carrinho"

### 4. 📸 Galeria
- Galeria de fotos com categorias
- Lightbox para visualização ampliada
- Lazy loading de imagens

### 5. ⭐ Features
- Diferenciais e benefícios
- Ícones animados
- Layout em grid responsivo

### 6. 💬 Depoimentos
- Avaliações de clientes
- Carousel de depoimentos
- Sistema de avaliação por estrelas

### 7. 📞 Contato
- Formulário de contato completo
- Validação de campos
- Informações de contato

### 8. 📄 Footer
- Links rápidos
- Newsletter
- Redes sociais
- Informações legais

---

## 🛒 Sistema de Carrinho

### Funcionalidades Principais

```typescript
✅ Adicionar produtos ao carrinho
✅ Remover produtos individuais
✅ Atualizar quantidades
✅ Limpar carrinho completo
✅ Aplicar cupons de desconto
✅ Cálculo automático de totais
✅ Persistência no localStorage
✅ Notificações toast
```

### Interface do Carrinho

- **Layout Responsivo**: Adapta-se perfeitamente a qualquer tela
- **Animações**: Entrada suave dos itens com delay escalonado
- **Controles Intuitivos**: Botões +/- para quantidade
- **Resumo Visual**: Total, frete e desconto sempre visíveis
- **Cupons**: Sistema integrado de cupons de desconto

---

## 💳 Checkout

### Processo em 3 Etapas

#### 1️⃣ Dados Pessoais
- Nome completo
- Email
- Telefone

#### 2️⃣ Endereço de Entrega
- **Busca automática de CEP** (ViaCEP API)
- Endereço completo
- Número e complemento
- Bairro, cidade e estado

#### 3️⃣ Método de Pagamento
- Cartão de Crédito
- Cartão de Débito
- **PIX (5% de desconto)**

### Validações
- ✅ Campos obrigatórios
- ✅ Formato de email
- ✅ Formato de telefone
- ✅ Validação de cartão
- ✅ Feedback visual de erros

---

## 🎨 Design

### Paleta de Cores

```css
Primary:   #3B82F6 (Azul principal)
Secondary: #60A5FA (Azul secundário)
Tertiary:  #93C5FD (Azul terciário)
Light:     #F9F3E5 (Bege claro)
Dark:      #3F3D56 (Cinza escuro)
```

### Componentes

- **Cards**: Com hover effects e sombras
- **Botões**: Rounded com animações
- **Inputs**: Estilizados e validados
- **Modais**: Lightbox para imagens
- **Toasts**: Notificações elegantes

### Animações

- Fade in/out
- Scale on hover
- Slide transitions
- Bounce effects
- Smooth scrolling

---

## 📂 Estrutura do Projeto

```
melhor-amigo-petshop/
├── public/                 # Arquivos estáticos
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/         # Componentes React
│   │   ├── ui/            # Componentes Shadcn/ui
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Products.tsx
│   │   ├── Gallery.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollToTop.tsx
│   ├── pages/             # Páginas da aplicação
│   │   ├── Index.tsx       # Página principal
│   │   ├── Cart.tsx       # Carrinho de compras
│   │   ├── Checkout.tsx    # Checkout
│   │   └── NotFound.tsx   # 404
│   ├── contexts/          # Contextos React
│   │   └── CartContext.tsx # Contexto do carrinho
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilitários
│   │   └── utils.ts
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Entry point
│   └── index.css          # Estilos globais
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🔧 Scripts

```json
{
  "dev": "vite",              // Servidor de desenvolvimento
  "build": "vite build",      // Build de produção
  "preview": "vite preview",  // Preview do build
  "lint": "eslint ."          // Linter
}
```

### Uso

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview

# Linter
npm run lint
```

---

## 🎁 Cupons de Desconto

O sistema possui cupons pré-configurados:

| Cupom | Desconto | Descrição |
|-------|----------|-----------|
| `PET10` | 10% | Desconto para pets |
| `MELHORAMIGO` | 15% | Desconto especial |
| `BEMVINDO` | 5% | Desconto de boas-vindas |

### Como Usar

1. Adicione produtos ao carrinho
2. Na página do carrinho, digite o cupom
3. Clique em "Aplicar"
4. O desconto será aplicado automaticamente

---

## 📸 Screenshots

> *Screenshots serão adicionados em breve*

### Funcionalidades em Destaque

- 🎨 **Interface Moderna**: Design limpo e profissional
- 📱 **Totalmente Responsivo**: Funciona em todos os dispositivos
- ⚡ **Performance**: Carregamento rápido e otimizado
- 🎯 **UX Excepcional**: Animações e feedback visual

---

## 🤝 Contribuindo

Este é um projeto privado, mas sugestões são sempre bem-vindas!

---

## 📝 Licença

Este projeto é privado e de uso exclusivo.

---

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ para cuidar do seu melhor amigo! 🐕🐱

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela! ⭐**

Made with ❤️ using React + TypeScript + Vite

</div>
