import 'animate.css'
import './App.sass'
import './App.css'
import 'bulma-switch'
import 'bulma-pageloader'
import React, { useState, useEffect, useContext } from 'react'

import { ThemeContext } from './theme-context-manager'

import NavBar from '../NavBar/NavBar'
import CatalogContainer from '../CatalogContainer/CatalogContainer'
import ShopCart from '../ShopCart/ShopCart'

import { pokeApi } from '../../Util/pokeApi'
import typesResourceDictionary from '../../Util/typeResourceDictionary'

import {
  togglePokemonIsOnCartFlag,
  updatePokemonOnCatalogArr,
  addToCart,
  removeFromCart,
} from '../../Util/handleCartStateHelpers'

export default function App() {
  const { theme } = useContext(ThemeContext)

  const [toggleCart, setToggleCart] = useState(false)

  // add remove pokemons on cart
  const [pokemonsOnCatalog, setPokemonsOnCatalog] = useState([])
  const [pokemonsOnCart, setOnCart] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // show/hide cart logic
  const handleToggle = () => setToggleCart(!toggleCart)

  const resetAppState = () => {
    fetchAllPokemonsFromType(theme)
  }

  useEffect(() => {
    document.title = `PokéShop | ${theme.name}`
  })

  const fetchAllPokemonsFromType = async ({ id }) => {
    setIsLoading(true)
    const response = await pokeApi.getAllPokemonsFromType(
      id,
      typesResourceDictionary,
      fetch,
    )
    setOnCart([])
    setIsLoading(false)
    setToggleCart(false)
    setPokemonsOnCatalog(response)
  }

  useEffect(() => {
    fetchAllPokemonsFromType(theme)
  }, [theme])

  const handleAddToCart = idFromEvent => {
    const foundPokemonIndex = pokemonsOnCatalog.findIndex(
      ({ id: pokemonId, ...pokemon }) => {
        if (pokemon.hasOwnProperty('isOnCart') && pokemon.isOnCart)
          return false;
        return pokemonId === idFromEvent;
      }
    );
    if (foundPokemonIndex === -1) return;
    const foundFlaggedPokemon = togglePokemonIsOnCartFlag(
      pokemonsOnCatalog[foundPokemonIndex],
    )
    addToCart(foundFlaggedPokemon, pokemonsOnCart, setOnCart)
    updatePokemonOnCatalogArr(
      foundPokemonIndex,
      foundFlaggedPokemon,
      pokemonsOnCatalog,
      setPokemonsOnCatalog,
    )
  }

  const handleRemoveFromCart = idFromEvent => {
    const foundPokemonOnCartIndex = pokemonsOnCart.findIndex(
      ({ id: pokemonId }) => pokemonId === idFromEvent,
    )
    const foundPokemonOnCatalogIndex = pokemonsOnCatalog.findIndex(
      ({ id: pokemonId }) => pokemonId === idFromEvent,
    )
    const foundFlaggedPokemon = togglePokemonIsOnCartFlag(
      pokemonsOnCatalog[foundPokemonOnCatalogIndex],
    )
    removeFromCart(foundPokemonOnCartIndex, pokemonsOnCart, setOnCart)
    updatePokemonOnCatalogArr(
      foundPokemonOnCatalogIndex,
      foundFlaggedPokemon,
      pokemonsOnCatalog,
      setPokemonsOnCatalog,
    )
  }

  return isLoading ? (
    <PageLoader />
  ) : (
    <div className="App">
      <NavBar handleClick={handleToggle} />
      <div className="flex-container">
        <div className="left-column">
          <CatalogContainer
            toggleCartValue={toggleCart}
            pokemonsOnCatalog={pokemonsOnCatalog}
            handleClick={handleAddToCart}
          />
        </div>
        <div
          className={`right-column box ${
            toggleCart ? 'open-cart' : 'close-cart'
          }`}
        >
          <ShopCart
            pokemonsOnCart={pokemonsOnCart}
            handleClick={handleRemoveFromCart}
            handleSuccess={resetAppState}
          />
        </div>
      </div>
    </div>
  )
}

function PageLoader() {
  return (
    <div className="pageloader is-active is-info">
      <span className="title">Gotta Catch 'Em All!</span>
    </div>
  )
}
