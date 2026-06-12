# PedroLabs Portfolio

Portfólio estático em HTML, CSS e JavaScript.

## Como abrir

Abra `index.html` no navegador.

## Foto de perfil

A moldura da tela inicial usa `assets/foto-perfil.svg` como placeholder. Para usar sua foto, substitua esse arquivo ou altere o `src` da imagem no `index.html`.

## Tema claro e escuro

O botão no topo alterna entre modo claro e escuro e salva a preferência no navegador. Para testar diretamente por URL, use `?theme=light` ou `?theme=dark`.

## Como adicionar novos projetos

No arquivo `script.js`, adicione um novo objeto ao array `projects`:

```js
{
    title: "Nome do projeto",
    category: ["site"],
    type: "Landing page",
    year: "2026",
    description: "Resumo curto do projeto.",
    url: "https://link-do-projeto.com",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "#8ed5c1"
}
```

Categorias usadas nos filtros: `site`, `app` e `portfolio`.
