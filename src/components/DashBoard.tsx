import { useEffect } from "react"
import { observer } from "mobx-react"

import Loading from "./Loading"
import Error from "./Error"
import Card from "./Card"
import store from "../store"

function PokeDex() {
  useEffect(() => {
    if (store.search.length > 0) {
      store.filterSearch(store.search)
    }
    store.fetchCurrentPage(0)
    // eslint-disable-next-line
  }, [store.pokemons])

  if (store.loading) {
    return <Loading />
  }

  // if there is an error
  if (store.error) {
    return <Error message='Oh no! Error while fetching your Pokemon.😰' />
  }

  if (!!store.search && !store.pokemonData.length) {
    return <Error message='Sadly, no such Pokemon exist.😰' />
  }

  return (
    <div className='bg-white'>
      <div className='max-w-2xl min-h-[70vh] mx-auto py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-5 lg:gap-x-8 relative'>
          {store.pokemonData.map((pokemon) => {
            return <Card key={pokemon.id} pokemon={pokemon} />
          })}
        </div>
      </div>
    </div>
  )
}

export default observer(PokeDex)
