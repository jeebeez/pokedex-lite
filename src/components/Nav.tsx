import { SearchIcon } from "@heroicons/react/solid"
import { MultiSelect } from "react-multi-select-component"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Option } from "../interfaces/types"
import store from "../store"
import logo from "../assets/images/logo.png"

const types = [
  { label: "Fire", value: "fire" },
  { label: "Grass", value: "grass" },
  { label: "Water", value: "water" },
  { label: "Electric", value: "electric" },
  { label: "Ground", value: "ground" },
  { label: "Fairy", value: "fairy" },
  { label: "Poison", value: "poison" },
  { label: "Dragon", value: "dragon" },
  { label: "Flying", value: "flying" },
  { label: "Fighting", value: "fighting" },
  { label: "Rock", value: "rock" },
  { label: "Bug", value: "bug" },
  { label: "Ghost", value: "ghost" },
  { label: "Psychic", value: "psychic" },
  { label: "Ice", value: "ice" },
  { label: "Dark", value: "dark" },
  { label: "Normal", value: "normal" },
  { label: "Steel", value: "steel" },
  { label: "Unknown", value: "unknown" },
  { label: "Shadow", value: "shadow" },
]

const pageCounts = [10, 20, 50]

function Nav() {
  const [filters, setFilters] = useState<Option[]>([])

  const renderPageList = () => pageCounts.map((item) => <option key={item}>{item} Per Page</option>)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.searchInput(e.target.value)
  }

  useEffect(() => {
    if (filters.length === 0) {
      store.fetchPokemon()
    } else {
      const values = filters.map((item) => item.value)
      store.applyFilters(values)
    }
  }, [filters])

  useEffect(() => {
    store.fetchCurrentPage(0)
    // eslint-disable-next-line
  }, [store.search])

  return (
    <>
      <nav className=' top-0 z-50 border-gray-200 px-2 sm:px-4 py-5 md:sticky bg-gray-800'>
        <div className=' flex flex-wrap justify-center gap-y-5 sm:justify-between items-center'>
          <a
            href='https://pokeapi.co'
            target='_blank'
            className='flex items-center '
            rel='noreferrer'
          >
            <img src={logo} height='70' width='120' className='mr-3 h-6 sm:h-9' alt='Logo' />
          </a>
          <div className='max-w-lg'>
            <div className='sr-only'>Search</div>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </div>
              <input
                id='search'
                name='search'
                className='block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm'
                placeholder='Search'
                onChange={(e) => {
                  handleChange(e)
                }}
                type='search'
              />
            </div>
          </div>
        </div>
      </nav>
      <div className='flex mx-5 justify-between my-2 items-center gap-3'>
        <MultiSelect
          className='flex-grow'
          options={types}
          value={filters}
          onChange={setFilters}
          labelledBy='Select'
        />
        <h2 className='sr-only'>Items Per Page</h2>
        <div>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const value = parseInt(e.target.value, 10)
              store.changePages(value)
            }}
            id='items'
            name='items'
            className=' w-full  py-2 px-10 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            defaultValue='10'
          >
            {renderPageList()}
          </select>
        </div>
      </div>
    </>
  )
}

export default observer(Nav)
