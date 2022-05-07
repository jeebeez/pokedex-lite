/* eslint-disable no-useless-escape */
/* eslint-disable no-console */

import { makeAutoObservable } from "mobx"
import { uniqBy } from "lodash"
import { PokemonData, SinglePokemon } from "../interfaces/types"
import P from "../api/pokeAPI"

interface SingleFilter {
  pokemon: SinglePokemon
  slot: string
}

class PokeStore {
  pokemonData: PokemonData[] = []

  pokemons: SinglePokemon[] = []

  searchResults: SinglePokemon[] = []

  perPage: number = 10

  totalPages: number = 0

  currentPage: number = 0

  loading: boolean = false

  error: boolean = false

  search: string = ""

  colorTypes = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ghost: "#d966ff",
    steel: "#bfbfbf	",
    ice: "#ccffff",
    dark: "#262626",
    shadow: "#404040	",
    unknown: "#FFFFFF",
  }

  constructor() {
    makeAutoObservable(this)
  }

  async fetchPokemon() {
    this.currentPage = 0
    this.loading = true
    try {
      const { results } = await P.getPokemonsList()
      this.pokemons = [...results]
    } catch (err) {
      console.log(err)
    }
  }

  async fetchCurrentPage(pageNumber: number) {
    this.loading = true
    this.setTotalPages()
    try {
      const startIndex = pageNumber * this.perPage
      const lastIndex = startIndex + this.perPage

      const currentPage = this.search
        ? this.searchResults.slice(startIndex, lastIndex)
        : this.pokemons.slice(startIndex, lastIndex)

      const pokemonArray = []

      const names = currentPage.map((item) => item.name)
      const response: any = await P.getPokemonByName([...names])
      for (let i = 0; i < response.length; i += 1) {
        const { id, name, types, stats } = response[i]
        const type = types.map((item: any) => item.type.name)
        const stat = stats.map((item: any) => {
          const value = item.base_stat
          const statName = item.stat.name
          return { value, statName }
        })
        pokemonArray.push({
          id,
          name,
          type,
          stat,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        })
      }
      this.pokemonData = pokemonArray
      this.loading = false
    } catch (err) {
      console.error(err)
      this.error = true
      this.loading = false
    }
  }

  async applyFilters(selected: string[]) {
    const pokeData: SinglePokemon[] = []

    try {
      this.loading = true
      const answers: any = await P.getTypeByName([...selected])

      for (let i = 0; i < answers.length; i += 1) {
        answers[i].pokemon.map((item: SingleFilter) => pokeData.push(item.pokemon))
      }
      const unique: SinglePokemon[] = uniqBy(pokeData, "name")

      unique.sort((a, b) => {
        const x = a.url.match(/\/(\d+)+[\/]?/g)?.map((id: any) => id.replace(/\//g, ""))
        const y = b.url.match(/\/(\d+)+[\/]?/g)?.map((id: any) => id.replace(/\//g, ""))

        // @ts-ignore-next-line
        return parseInt(x[0], 10) - parseInt(y[0], 10)
      })

      this.pokemons = unique
    } catch (err) {
      console.error(err)
      this.error = true
    }
  }

  filterSearch(search: string) {
    this.searchResults = []
    this.searchResults = this.pokemons.filter((pokemon) =>
      pokemon.name.includes(search.toLowerCase())
    )
  }

  searchInput(value: string) {
    const search = value.trim()
    if (search.length) {
      this.filterSearch(search)
    }
    this.search = search
  }

  changePages(value: number) {
    this.perPage = value
  }

  setCurrentPage(page: number) {
    this.currentPage = page
  }

  setTotalPages() {
    this.totalPages = this.search
      ? this.searchResults.length / this.perPage
      : this.pokemons.length / this.perPage
  }
}

const myPokeStore = new PokeStore()

export default myPokeStore
