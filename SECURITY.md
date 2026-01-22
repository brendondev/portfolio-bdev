# Security Best Practices

## Variáveis de Ambiente

Para informações sensíveis (API keys, tokens, etc.), use **variáveis de ambiente**:

### 1. Configuração Local

Crie um arquivo `.env` (já no `.gitignore`):

```bash
UMAMI_WEBSITE_ID=seu-id-aqui
API_KEY=sua-chave-secreta
```

### 2. No Netlify

1. Acesse: Netlify Dashboard → Site Settings → Environment Variables
2. Adicione suas variáveis:
   - Key: `UMAMI_WEBSITE_ID`
   - Value: `797a163c-7d39-4b04-a91b-30b0ebc62a01`
3. Save e faça redeploy

### 3. Para Sites Estáticos (HTML/JS)

Como não há build step, variáveis de ambiente do Netlify não são automaticamente disponíveis no browser.

**Opções:**

#### Opção A: Deixe valores públicos no código (para IDs de analytics)
O ID do Umami não é secreto - é só um identificador público.

#### Opção B: Use um arquivo de configuração separado
Crie `config.js`:
```javascript
window.ENV = {
  UMAMI_ID: '797a163c-7d39-4b04-a91b-30b0ebc62a01'
};
```

E no HTML:
```html
<script src="config.js"></script>
<script>
  const websiteId = window.ENV?.UMAMI_ID || '797a163c-7d39-4b04-a91b-30b0ebc62a01';
</script>
```

#### Opção C: Build com ferramenta (Vite/Parcel)
Para projetos futuros, considere usar um bundler que suporta variáveis de ambiente:
```bash
npm create vite@my-portfolio -- --template vanilla
```

## O que NÃO expor no código público

- ✅ API keys e tokens
- ✅ Senhas de banco de dados
- ✅ Chaves de APIs de pagamento
- ✅ Tokens de email marketing

## O que é OK deixar público

- ✅ Analytics Website IDs (como Umami)
- ✅ URLs de APIs públicas
- ✅ Links para redes sociais

## Verificação

Antes de commitar, rode:
```bash
grep -r "api[_-]key\|password\|secret\|token" --include="*.js" --include="*.html" .
```

Se encontrar algo, mova para variável de ambiente.
