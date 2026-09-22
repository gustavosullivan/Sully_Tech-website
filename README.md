# Sully Tech

Site institucional da Sully Tech — landing page + link tree.

**Produção:** [https://sullytech.com.br](https://sullytech.com.br)

## Rodar local

```bash
npm install
npm run dev
```

- Landing: `http://localhost:5173/`
- Link tree: `http://localhost:5173/site`

## Deploy

Push em `main` dispara o workflow **Deploy GitHub Pages** (`.github/workflows/deploy.yml`).

Domínio customizado: `sullytech.com.br` (`public/CNAME`).

### DNS (uma vez)

No painel do domínio, aponte para o GitHub Pages:

| Tipo  | Nome | Valor                         |
| ----- | ---- | ----------------------------- |
| A     | `@`  | `185.199.108.153`             |
| A     | `@`  | `185.199.109.153`             |
| A     | `@`  | `185.199.110.153`             |
| A     | `@`  | `185.199.111.153`             |
| CNAME | `www`| `gustavosullivan.github.io`   |

No repo: **Settings → Pages → Source: GitHub Actions** e custom domain `sullytech.com.br` (HTTPS on).

## Contatos

- WhatsApp: +55 54 99369-8492
- E-mail: gubportela@gmail.com
- LinkedIn: https://www.linkedin.com/in/gustavobportelacc/
