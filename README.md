# React List of Goods (JS)

Aplicação em React que permite ordenar dinamicamente uma lista de produtos utilizando diferentes critérios de ordenação.

[DEMO LINK](https://Igor-hrm.github.io/react_list-of-goods-js/)

---

## Sobre o projeto

Este projeto implementa funcionalidades de ordenação para uma lista de produtos, permitindo ao usuário reorganizar os itens de forma alfabética, por tamanho do nome, inverter a ordem atual ou resetar para o estado inicial.

A interface reage dinamicamente ao estado atual da ordenação, incluindo alterações visuais nos botões ativos.

---

## Tecnologias utilizadas

- React
- JavaScript
- Bulma CSS
- GitHub Pages

---

## Funcionalidades implementadas

- Ordenação alfabética dos produtos
- Ordenação pelo tamanho do nome
- Inversão da ordem atual
- Reset da lista para a ordem original
- Controle visual de botões ativos com classes dinâmicas
- Renderização condicional do botão de reset

---

## Regras de funcionamento

### Sort alphabetically

- Ordena os produtos em ordem alfabética
- Remove a classe `is-light` quando ativo

### Sort by length

- Ordena os produtos pelo tamanho do nome
- Remove a classe `is-light` quando ativo

### Reverse

- Inverte a ordem atual da lista
- Funciona em conjunto com qualquer tipo de ordenação
- Remove a classe `is-light` quando ativo
- Um segundo clique retorna à ordem direta

### Reset

- Retorna a lista para a ordem original
- Só é exibido quando a lista **não** está na ordem inicial

---

## Conceitos praticados

- Manipulação de arrays (`sort`, `reverse`)
- Estado no React (`useState`)
- Renderização condicional
- Classes CSS dinâmicas
- Lógica de UI baseada em estado
- Imutabilidade de dados

---

## Como rodar o projeto localmente

1. Clone o repositório:

```bash
git clone https://github.com/Igor-hrm/react_list-of-goods-js.git
```
