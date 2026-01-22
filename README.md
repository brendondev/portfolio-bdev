# Portfólio Minimalista Premium

Um portfólio profissionalminimalista e premium construído com Astro, focado em performance, SEO e conversão.

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
├── robots.txt
└── favicon.svg
```

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

## Deployment no GitHub Pages

### Configuração Inicial

1. Crie um repositório no GitHub
2. Faça push do código
3. Vá em Settings > Pages
4. Em "Build and deployment", selecione "GitHub Actions"

### Deploy Automático

A cada push na branch `main`, o site será automaticamente buildado e deployado.

### URL do Site

O site estará disponível em:
```
https://seuusername.github.io/nome-do-repositorio/
```

Para funcionar corretamente, edite `astro.config.mjs` e altere a URL:

```javascript
export default defineConfig({
  site: 'https://seuusername.github.io/nome-do-repositorio',
  // ...
});
```

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
