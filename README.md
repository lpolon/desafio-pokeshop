# Introdução

desafio para vaga de front-end na b2w.

link para o app:
https://leo-pokeshop.herokuapp.com/

# Decisões de arquitetura

## Como criar lojas de tipos de pokémon diferentes aproveitando a mesma base de código?

Nesse aplicativo, as lojas de diferentes tipos serão controladas pela barra de navegação (web api window.location) através da lib react-router-dom. Então: example.com/fogo

- chamada Ajax busca os pokemons de fogo e carrega no estado do App;
- roteador serve os componentes da loja de fogo.
  - para reutilizar componentes, os estilos que mudam serão passados por inline style (style={{}});
  - Esses componentes receberão o style object usando a Context API do React:
    - Os styled componentes estarão subscribed à um Context.provider, utilizando o useContext() hook.
    - Não vou passar o style obj por props, porque numa aplicação real daria muito mais trabalho de manutenção e muito "props drilling".

### ressalvas:

- Eu entendo que a solução que eu estou propondo é uma aproximação do problema real (a mesma base para a americanas, submarino, etc...). Estou tratando as lojas de tipos de pokemon como **departamentos** e não como **lojas** diferentes.
- Eu não tenho experiência prática para uma solução verdadeira. Entendo que uma solução real precisaria de uma abordagem mais abrangente do que apenas uma single page application. Por exemplo: alguma ferramenta como ngnix para servir vários domínios com um único web server.

# Diário

O objetivo dessa sessão é explicitar a minha linha de raciocínio, coisas que eu tentei, conforme o andamento do projeto.

## 15/mar/2020

Como estou começando esse projeto do zero e ele tem um escopo bem definido, começarei definindo os componentes que eu preciso e criar uma versão estática ([é uma sugestão da documentação que eu gosto](https://reactjs.org/docs/thinking-in-react.html)).

O styling das diferentes lojas será feito com inline styles passados pela context API, mas não vou abrir mão do CSS para conseguir a responsividade! Pretendo utilizar a biblioteca Bulma para o layout comum entre as diferentes lojas.

### Componentes que eu vou precisar:

App
|
|-Navbar ok
|-CatalogContainer
| |-SearchBar ok
| |-Catalog ok
| |-bigCard 1 ok
| |-... ok
| |-bigCard N ok
|
|-ShopCart
|-Catalog (o mesmo? HOC?)
| |-smallCard 1
| |- ...
| |- smallCard N
|
|-Total

## 16/mar/2020

continuei criando o styling e render estático dos componentes:
Catalog e CatalogCard

## 17/mar/2020

de componente, falta o ShopCard;
O ShopCard tem comportamentos bem diferentes no desk e no mobile:
se > 769px: ocupa uma coluna da tela. ok
se <= 769px: toggle do shop-cart.

- media query ok
- animar a media query com transition ok
- mobile: remover hamburger de todos os tamanhos OK
- quando shopcart estiver visível, opção de toggle com animação.
  - Cheguei a escrever uma css transition, mas se um click também poderá alterar a visibilidade do shop cart, o controle da animação precisa ser do React.
    - Usar css para resolver apenas a posição do shop cart para cada tamanho de tela --> absolute para mobile --> column para desktop
    -
    TODO: usar state & react-spring para controlar a visibilidade e animação.

problemas atuais de responsividade:

- o position relative do .App quebra em telas muito pequenas --> Desisti do is-fixed-top da navbar para simplificar -->
  TODO: controlar essa propriedade por manipulação de DOM e onScroll.

- Diminuir o tamanho do CatalogCard em telas pequenas OK

## 18/mar/2020

- styling e responsividade do ShopCart OK
- toggle e useSpring do react-spring para animar shopping cart OK

## sobre a PokeApi

Li um tanto da documentação da PokeApi agora e entendi que para buscar uma lista de todos os pokemons e tipos, eu preciso fazer uma chamada para cada pokemon.

Além disso, tendo os dados, eu precisaria inventar um preço de qualquer forma.

**As opções que eu enxergo são:**

- colar as informações na aplicação --> Não. Perde o sentido remover a complexidade de chamadas Ajax e etc...

- pegar os dados uma vez e colocá-los num servidor --> Não. Acho que no mundo real, a API estaria mais preparada para servir a loja, mas descumpro as regras do desafio dos dados virem da pokeApi.

- fazer literalmente mil chamadas toda vez que carregar a aplicação e dane-se --> Não. Arriscado (bloqueie a aplicação) e não segue o fair use da documentação da pokeapi;

- usar a webApi localStorage para cachear os dados que eu preciso retornados da chamada Ajax. Além de se aproximar do desafio de persistir dados no reload.
  - https://www.sitepoint.com/cache-fetched-ajax-requests/
  - https://alligator.io/js/introduction-localstorage-sessionstorage/

## 19/mar/2020

## Sobre a PokeApi:

Lendo melhor a documentação da PokeApi, vi que tem sim o recurso types! Portanto, com certeza dá pra buscar pelo menos uma loja. Eu não acho que vou ter tanto tempo pra isso, então devo escolher tipos [um pouco menos abundantes](https://www.reddit.com/r/pokemon/comments/8o6fow/number_of_pokemon_per_type_ranking_chart/).

## adicionar e remover dados fake do carrinho clicando em remove ou no carrinho --> OK

Um click em adicionar ou remover terá dois efeitos:

- anotar no pokemon que ele está selecionado;
- acrescentá-lo no array do carrinho.

Entendo que é a melhor opção:

- contanto que seja um único render com duas mudanças de estado (entendo que o react fará um lote porque um único event handler chamou os dois "setState")
- assim, o render do catálogo vai ser mais rápido (não precisa procurar se o pokemon está incluso no carrinho durante o map)
- o Render do carrinho será mais rápido (não precisa filtrar o catálogo de pokemons)

## filtrar resultado da pesquisa --> OK

Como filtrar?

- Vou criar um container para Catalog e SearchBar e colocar a lógica de filtro lá, tentar manter no App apenas a lógica realmente global.

- "lift state up" do searchInput e o handleChange da SearchBar.

0 a forma mais básica seria:

```javascript
const filteredArray = (queryString, arrayOfObjects) =>
  arrayOfObjects.filter(({ name }) => name.includes(queryString));
```

- Vou fazer funcionar assim, primeiro, mas acho que dá pra rapidamente implementar uma pesquisa mais legal. ok

- Fiz de um jeito que eu acho melhor de usar!
  - transforma a string de pesquisa e o nome dos pokemons num objeto. p. ex.: 'aaabcdd' se torna {a: 3, b: 1, c: 1, d: 2}
  - filtra e retorna apenas se:
    - o nome do pokemon conter todos os characteres inputados
    - a quantidade de characteres no nome do pokemon for menor ou igual a quantidade na string de pesquisa.
    - escrevi essas iterações com .find() e com condicionais que tentam falhar (p. ex.: .find() NÃO inclui um character da pesquisa), para não procurar no array inteiro desnecessariamente.

## 20/03/20

### Criar duas lojas - parte 1: Context API --> OK
- Vou tentar utilizar styled components e Context. A idéia é ter uma chave que defina o styling. Essa mesma chave vai ser usada no primeiro render para o fetch --> Desisti. Depois de ler a documentação, ver exemplos e testar um pouco, me pareceu bem confuso misturar styled-components com as stylesheets que eu já tenho.

Vou seguir a documentação da Context API (que é com temas para implementar o que eu preciso) --> OK
  - segui [essas instruções](https://reactjs.org/docs/context.html#dynamic-context). [Essa thread](https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component) me ajudou MUITO à adaptar para hooks e pro meu caso.

## criar duas lojas - parte 2: Fetch resources da pokeApi
- agora eu tenho disponível onde eu quiser uma string representando o tipo de pokemon com um valor inicial de ice

## TO-DO geral

- Styling & layout --> OK
  - ...
  - Styling de tabela do shopping cart --> OK
  - toggle e useSpring do react-spring para animar shopping car --> OK
- Stateful behaviour
  - adicionar e remover dados fake do carrinho clicando em remove ou no carrinho --> OK
  - filtro de resultados de pesquisa --> OK
  - Resetar state ao confirmar compra + modal (extra)
  - Context API
    - styling das duas lojas: logo e cor; --> OK
- Util
  - Fetch da Api com localStorage!
- Tests:
  - mock do fetch
  - eu ainda não realmente sei testar componentes _facepalm_

- Coisas menores:
  - controlar o max-width do ShopCart
  