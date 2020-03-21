# Introdução

desafio para vaga de front-end na b2w.

link para o app:
https://leo-pokeshop.herokuapp.com/

# Decisões de arquitetura

## Como criar lojas de tipos de pokémon diferentes aproveitando a mesma base de código?

Nesse aplicativo, as lojas de diferentes tipos são controladas pela opção da navbar

- chamada Ajax busca os pokemons de um tipo e carrega no estado do App;
- boa parte do styling foi feito com bulma ou stylesheets.
- os stylings do tema são passados pelo objeto style (css-in-js). O tema é controlado usando a API Context

### ressalvas:

- Eu entendo que a solução que eu estou propondo é uma aproximação do problema real (a mesma base para a americanas, submarino, etc...). Estou tratando as lojas de tipos de pokemon como **departamentos** e não como **lojas** diferentes.
- Eu não tenho experiência prática para uma solução verdadeira! Entendo que uma solução real precisaria de uma abordagem mais abrangente, Por exemplo: alguma ferramenta como ngnix para servir vários domínios com um único web server. Pelo o que eu pesquisei, entendi que algum serviço tipo amazon E2C seria adequado.

# Diário

O objetivo dessa sessão é explicitar a minha linha de raciocínio, coisas que eu tentei, conforme o andamento do projeto.

## 15/mar/2020

Como estou começando esse projeto do zero e ele tem um escopo bem definido, começarei definindo os componentes que eu preciso e criar uma versão estática ([é uma sugestão da documentação que eu gosto](https://reactjs.org/docs/thinking-in-react.html)).

O styling das diferentes lojas será feito com inline styles passados pela context API, mas não vou abrir mão do CSS para conseguir a responsividade! Pretendo utilizar a biblioteca Bulma para o layout comum entre as diferentes lojas.

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
usar state & react-spring para controlar a visibilidade e animação. OK

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

- a forma mais básica seria de filtrar seria --> OK
```javascript
const filteredArray = (queryString, arrayOfObjects) =>
  arrayOfObjects.filter(({ name }) => name.includes(queryString));
```

- Mudei de ideia. Fiz de um jeito que eu acho melhor de usar!
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

## criar duas lojas - parte 2: Fetch resources da pokeApi --> OK
- agora eu tenho disponível onde eu quiser uma string representando o tipo de pokemon com um valor inicial de ice.
Essa string é passada para uma função que faz a chamada Ajax para buscar os recursos no endpoint /https://pokeapi.co/api/v2/type/ e depois cada endpoint encontrado é feita uma nova chamada para buscar o pokemon.

- Problema: não tem error handling.. Eu poderia até tirar o try catch...

## ajustes de styling --> OK

## Outras coisas rápidas:
### Botão de finalizar compra e resetar o estado --> OK

### outras lojas --> OK
- basta acrescentar a opção, e os estilos. A lista de itens para escolher a loja precisa ser dinâmica.

- acrescentei para todos os tipos. Afinal, gotta catch'em all!

### salvar estado localmente com localStorage --> WIP
não deu tempo:
https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2

https://alligator.io/js/introduction-localstorage-sessionstorage/

# Reflexões & próximos passos
## A forma que eu fiz o styling ficou rapidamente desajeitada
- misturar o framework bulma com css-in-js, ficou mais complexo do que eu gostaria. Entendo que styled-components é uma forma mais fácil de dar manutenção. Eu não tenho experiência e não arrisquei;
- A forma específica que eu escolhi para animar também me pareceu desajeitada;

## Sobre o controle do estado:
- Eu penso que o app ficaria mais simples e fácil de dar manutenção se eu tivesse utilizado mais a API de contexto. Entendo que evitaria o componente Container e o drilling de props que eu fiz.
- Achei um pouco estranho que o controle da loja esteja na navbar. Eu utilizei o react-router-dom em vários outros projetos e pensei como alternativa, mas quis tentar de uma forma mais desconfortável.

## Problemas

### bugs
eu tomei um susto com os bugs que eu fui achando no final do projeto. Principalmente quando trouxe os dados externos e a mudança de estado entre as lojas.
Além disso, eu escrevi algumas funções de javascript puras e absolutamente nada tem testes unitários. Das poucas vezes que eu trabalhei com grupo, algumas vezes eu tive dificuldade em confiar que estava tudo funcionando e é irritante achar um bug que nem é seu.
Enfim, eu sinto falta de testes unitários. Comecei a aprender recentemente e me faltou tempo e confiança para tentar utilizar nesse desafio.

### error handling
Não tem. Não cheguei a testar os erros da API. O try-catch é completamente inutil. Seria um próximo passo rápido e óbvio

### props drilling
apesar de eu ter usado a api de contexto, eu não me sinto completamente apropriado dela e me senti besta de ter o contexto e ficar ajustando as props de style do react-spring com props-drilling. Eu acredito que styled-components facilitaria esse trabalho.

### muitas linhas no App
penso que uma forma de lidar com isso seria utilizar custom hooks para separar melhor a lógica e tornar a aplicação mais testável e de fácil manutenção.

## próximos passos:
como aprendizado, acredito que seria:
- escrever todos os testes necessários
- deployer como lojas diferentes

## TO-DO geral
- Styling & layout --> OK
  - ...
  - Styling de tabela do shopping cart --> OK
  - toggle e useSpring do react-spring para animar shopping car --> OK
- Stateful behaviour
  - adicionar e remover dados fake do carrinho clicando em remove ou no carrinho --> OK
  - filtro de resultados de pesquisa --> OK

  - Resetar state ao confirmar compra + modal (extra) --> OK
  
  - styling das duas lojas: logo e cor com Context Api --> OK
  - Fetch da Api --> OK
  - com localStorage! 
  - lembrar do carrinho do usuário com localStorage (extra)
- Tests:
  - mock do fetch
  - eu não sei testar componentes
  - testes das utils

- Extras:
  - botão de finalizar compra
  - salvar dados localmente
  - modal de obrigado

- Coisas menores:
  - controlar o min-width do ShopCart --> OK

## BUGs:
- right-column no mobile fica em cima da navbar quando colapsada --> OK
- outros bugs porque eu não estava resentando o state direito quando mudava de loja!  Imagina se eu tivesse testes... --> OK