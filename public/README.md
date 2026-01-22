# Portfólio Minimalista Premium

Um portfólio profissional, minimalista e premium construído com Astro, focado em performance, SEO e conversão.

**Domínio:** https://brendondev.thedev.me

## Características

- **Stack Moderna**: Astro + TypeScript + Tailwind CSS
- **Performance Otimizada**: Site estático com carregamento rápido
- **SEO Completo**: Meta tags, OpenGraph, Sitemap, RSS
- **Dark Mode**: Toggle com persistência via localStorage
- **Conteúdo em JSON**: Projetos e posts gerenciados via arquivos JSON
- **Design Clean**: Estilo minimalista premium inspirado em sawad.framer.website

## Páginas

- `/` - Home com hero, projetos em destaque, serviços e posts recentes
- `/projects` - Grid de projetos com filtros e busca
- `/projects/[slug]` - Página individual do projeto
- `/blog` - Listagem de posts com paginação
- `/blog/[slug]` - Página individual do post
- `/about` - Sobre e experiência profissional
- `/contact` - Contato com formulário e links sociais
- `/tags` - Página de todas as tags
- `/tags/[tag]` - Conteúdo filtrado por tag

## Estrutura de Pastas

```
src/
├── components/     # Componentes reutilizáveis
│   ├── Header.astro
│   ├── Footer.astro
│   ├── ProjectCard.astro
│   ├── PostCard.astro
│   ├── TagPill.astro
│   ├── SearchInput.astro
│   └── Pagination.astro
├── layouts/        # Layouts de página
│   ├── BaseLayout.astro
│   └── MainLayout.astro
├── lib/            # Utilitários e tipos
│   ├── index.ts
│   ├── utils.ts
│   └── types.ts
├── pages/          # Rotas e páginas
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── projects/
│   ├── blog/
│   ├── tags/
│   └── rss.xml.js
├── styles/         # Estilos globais
│   └── global.css
└── env.d.ts
content/
├── projects/       # Arquivos JSON dos projetos
└── posts/          # Arquivos JSON dos posts
public/
├── CNAME
├── robots.txt
└── favicon.svg
```

## Configuração do Domínio thedev.me

### 1. Fork do Repositório de Domínio

1. Acesse: https://github.com/thedev-me/register
2. Clique em **Fork** (canto superior direito)
3. Após o fork, edite o arquivo `domains/brendondev.thedev.me.json`

### 2. Configure o Arquivo de Domínio

O arquivo `brendondev.thedev.me.json` já está criado na pasta raiz. Atualize com seu username do GitHub:

```json
{
  "subdomain": "brendondev",
  "domain": "thedev.me",
  "email_or_discord": "seu-email@email.com",
  "github_username": "SEU-USERNAME-GITHUB-AQUI",
  "description": "Portfólio de desenvolvedor web",
  "records": {
    "A": [
      "185.199.108.153",
      "185.199.109.153",
      "185.199.110.153",
      "185.199.111.153"
    ]
  },
  "proxied": false
}
```

3. Faça commit das alterações
4. Abra um **Pull Request**

### 3. Configure o GitHub Pages

1. Vá para **Settings** > **Pages** do seu repositório
2. Em **Build and deployment** > **Source**, selecione "GitHub Actions"
3. O deploy será automático

### 4. Aguarde a Aprovação

- O PR será revisado manualmente
- Após aprovação, o domínio estará ativo em minutos
- Configure o domínio customizado em Settings > Pages > Custom domain: `brendondev.thedev.me`

## Como Usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:4321`

### Build

```bash
npm run build
```

Os arquivos compilados ficarão em `dist/`

### Preview

```bash
npm run preview
```

## Como Adicionar Novos Projetos

1. Crie um arquivo JSON em `content/projects/`

2. Use o modelo abaixo:

```json
{
  "slug": "nome-do-projeto",
  "title": "Título do Projeto",
  "headline": "Breve descrição",
  "year": "2024",
  "role": "Sua função no projeto",
  "stack": ["Tech1", "Tech2", "Tech3"],
  "tags": ["tag1", "tag2"],
  "coverImage": "URL da imagem",
  "gallery": ["URL1", "URL2"],
  "problem": "Descrição do problema",
  "solution": "Descrição da solução",
  "results": ["Resultado 1", "Resultado 2"],
  "links": [
    { "label": "Ver Projeto", "url": "https://..." }
  ]
}
```

3. Salve o arquivo. O projeto aparecerá automaticamente na página de projetos.

## Como Adicionar Novos Posts

1. Crie um arquivo JSON em `content/posts/`

2. Use o modelo abaixo:

```json
{
  "slug": "slug-do-post",
  "title": "Título do Post",
  "excerpt": "Breve descrição para cards e SEO",
  "date": "2024-12-15",
  "updatedAt": "2024-12-18",
  "tags": ["tag1", "tag2"],
  "coverImage": "URL da imagem",
  "readingTime": 10,
  "author": "Seu Nome",
  "canonical": "https://seu-site.com/outra-url",
  "content": "Conteúdo em **markdown** ou HTML"
}
```

3. Salve o arquivo. O post aparecerá automaticamente na listagem do blog.

## Deployment Automático

A cada push na branch `main`, o site será automaticamente buildado e deployado via GitHub Actions.

## Customização

### Cores

Edite `tailwind.config.mjs` para alterar as cores:

```javascript
colors: {
  primary: {
    // Sua paleta de cores
  }
}
```

### Informações Pessoais

Edite os arquivos de conteúdo e as páginas para adicionar suas informações.

## Licença

MIT
