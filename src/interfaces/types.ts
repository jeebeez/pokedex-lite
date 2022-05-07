export type Types =
  | "fire"
  | "grass"
  | "electric"
  | "water"
  | "ground"
  | "rock"
  | "fairy"
  | "poison"
  | "bug"
  | "dragon"
  | "psychic"
  | "flying"
  | "fighting"
  | "normal"

export interface SinglePokemon {
  name: string
  url: string
}

export interface StatsProps {
  value: number
  statName: string
}
export interface PokemonData {
  id: number
  name: string
  type: Types[]
  imageUrl: string
  stat: StatsProps[]
}

export interface Option {
  label: string
  value: string
}

export interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  pokemon: PokemonData
}

export interface CardProps {
  pokemon: PokemonData
}
