# PedroLabs - Portfólio v3.0

Portfólio profissional desenvolvido para apresentar minha trajetória como desenvolvedor front-end, meus principais projetos, habilidades técnicas e canais de contato.

A versão 3.0 do PedroLabs foi criada com foco em uma experiência mais moderna, responsiva e objetiva, reunindo identidade visual própria, navegação fluida, suporte a modo claro e escuro, apresentação visual com foto profissional e uma estrutura preparada para adicionar novos projetos com facilidade.

## Acesse o Projeto

O portfólio está disponível online pelo GitHub Pages:

https://pedrolucasso832.github.io/PedroLabs-v3/

## Sobre o Projeto

O PedroLabs é um site de página única desenvolvido com HTML, CSS e JavaScript puro. A proposta do projeto é apresentar, de forma direta e visualmente consistente, minha atuação como desenvolvedor front-end e facilitar o contato com recrutadores, clientes e pessoas interessadas em projetos web.

O site possui seções dedicadas à apresentação inicial, resumo profissional, stack de habilidades, projetos desenvolvidos e canais de contato.

## Funcionalidades

- Navegação por seções em página única
- Menu responsivo para dispositivos móveis
- Layout adaptado para desktop, notebook, tablet e celular
- Alternância entre modo claro e modo escuro
- Preferência de tema salva no navegador
- Suporte ao tema definido no sistema operacional
- Hero com moldura para foto de perfil
- Cards de projetos renderizados dinamicamente via JavaScript
- Filtros de projetos por categoria
- Formulário de contato com validação simples
- Integração do formulário com WhatsApp
- Links diretos para GitHub, LinkedIn, e-mail e WhatsApp
- Atualização automática do ano no rodapé
- Animações de entrada nas seções
- Efeitos visuais em botões, cards, links e campos de formulário

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts
- GitHub Pages

## Estrutura do Projeto

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── foto3.jpeg
    └── pedrolabs-logo.png
```

## Seções

### Início

Apresentação principal com nome, área de atuação, chamadas para visualizar projetos ou iniciar contato e uma moldura visual com foto de perfil.

### Sobre Mim

Resumo da minha trajetória, foco profissional em desenvolvimento front-end e abordagem para criação de interfaces modernas, responsivas e bem estruturadas.

### Stack

Área dedicada às principais habilidades e serviços relacionados ao desenvolvimento front-end, como HTML semântico, CSS responsivo, JavaScript e performance.

### Projetos

Área destinada à exibição dos principais projetos, com cards gerados por JavaScript a partir de um array no arquivo `script.js`. Essa estrutura facilita a adição recorrente de novos projetos.

### Contato

Seção com cards para GitHub, LinkedIn, e-mail e WhatsApp, além de formulário que direciona a mensagem preenchida para o WhatsApp.

## Tema Claro e Escuro

O site possui alternância entre modo claro e modo escuro por meio do botão no topo da navegação.

A escolha do usuário é salva no navegador com `localStorage`. Caso ainda não exista uma preferência salva, o site respeita o tema definido no sistema operacional.

Também é possível testar os temas diretamente pela URL:

```text
?theme=light
?theme=dark
```

## Como Adicionar Novos Projetos

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

Categorias usadas nos filtros:

- `site`
- `app`
- `portfolio`

## Como Executar Localmente

Clone o repositório:

```bash
git clone https://github.com/pedrolucasso832/PedroLabs-v3.git
```

Acesse a pasta do projeto:

```bash
cd PedroLabs-V#
```

Abra o arquivo `index.html` no navegador.

Como o projeto utiliza apenas HTML, CSS e JavaScript puro, não é necessário instalar dependências.

## Melhorias da Versão 3.0

- Implementação de modo claro e modo escuro
- Botão de alternância de tema com preferência salva
- Hero atualizado com espaço para foto de perfil
- Tipografia e alinhamento de textos refinados
- Grid responsivo ajustado para diferentes tamanhos de tela
- Seção de projetos preparada para novas adições via JavaScript
- Filtros para organização dos projetos
- Card de WhatsApp adicionado na seção de contato
- Melhor suporte a links diretos para seções da página
- Estrutura visual mais consistente para apresentação profissional

## Contato

- GitHub: [pedrolucasso832](https://github.com/pedrolucasso832)
- LinkedIn: [pedrolucass0](https://www.linkedin.com/in/pedrolucass0/)
- E-mail: pedrolabs.dev@gmail.com
- WhatsApp: [Enviar mensagem](https://wa.me/5583988510269)

## Autor

Desenvolvido por Pedro Lucas.
