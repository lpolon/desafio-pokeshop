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
- Eu entendo que a solução que eu estou propondo é uma aproximação do problema real (a mesma base para a americanas, submarino, etc...). Estou tratando as lojas de tipos de pokemon como __departamentos__ e não como __lojas__ diferentes.
- Eu não tenho experiência prática para uma solução verdadeira. Entendo que uma solução real precisaria de uma abordagem mais abrangente do que apenas uma single page application. Por exemplo: alguma ferramenta como ngnix para servir vários domínios com um único web server.

# Diário
O objetivo dessa sessão é explicitar a minha linha de raciocínio, coisas que eu tentei, conforme o andamento do projeto.

## 15/mar/2019
Como estou começando esse projeto do zero e ele tem um escopo bem definido, começarei definindo os componentes que eu preciso e criar uma versão estática ([é uma sugestão da documentação que eu gosto](https://reactjs.org/docs/thinking-in-react.html)).

O styling das diferentes lojas será feito com inline styles passados pela context API, mas não vou abrir mão do CSS para conseguir a responsividade! Pretendo utilizar a biblioteca Bulma para o layout comum entre as diferentes lojas.

### Componentes que eu vou precisar:

App
|
|-Navbar ok
|-CardListContainer
| |-SearchBar ok
| |-CardList ok
|   |-bigCard 1 ok
|   |-... ok
|   |-bigCard N ok
|
|-ShopCart
  |-CardList (o mesmo? HOC?)
  | |-smallCard 1
  | |- ...
  | |- smallCard N
  |
  |-Total

  ## 16/mar/2019
  continuei criando o styling e render estático dos componentes:
  CardList e LargeCard

  ## 17/mar/2019
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

- Diminuir o tamanho do LargeCard em telas pequenas OK

## TO-DO geral
- Styling de tabela do shopping cart
- toggle e useSpring do react-spring para animar shopping cart
- adicionar e remover dados fake do carrinho.
- Route da loja
- styling das duas lojas: logo e cor;
- Fetch da Api
- mock do fetch
