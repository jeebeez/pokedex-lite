import { useState } from "react"
import { observer } from "mobx-react-lite"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { v4 as uuid } from "uuid"
import store from "../store"
import { CardProps } from "../interfaces/types"
import capitalize from "../utils/capitalize"
import "react-lazy-load-image-component/src/effects/blur.css"
import Modal from "./Modal"

function Card({ pokemon }: CardProps) {
  const { name, type, imageUrl } = pokemon

  const [showModal, setShowModal] = useState<boolean>(false)

  // @ts-ignore-next-line
  const openModal = (event) => {
    if (event.button === 0 || event.code === "Enter") {
      setShowModal(true)
    }
  }

  return (
    <>
      <div
        onClick={openModal}
        className='group font-mono relative border rounded-lg flex flex-col overflow-hidden flex-shrink-0 shadow-md hover:shadow-2xl hover:scale-105 ease-in-out duration-200	 '
        style={{ backgroundColor: store.colorTypes[type[0]] }}
        onKeyDown={openModal}
        tabIndex={0}
        role='button'
      >
        <div className='aspect-w-1 aspect-h-1 bg-gray-200 '>
          <LazyLoadImage
            className='w-full h-full object-center object-cover'
            alt={name}
            effect='blur'
            src={imageUrl}
          />
        </div>
        <div className='flex-1 p-4 space-y-2 flex items-center justify-center	 flex-col select-none'>
          <h3 className=' py-2   text-gray-900'>{capitalize(name)}</h3>
          <div className=' flex gap-3'>
            {type.map((item) => (
              <div
                key={uuid()}
                className='rounded-xl px-4 text-center	py-2 border border-gray-300'
                style={{ backgroundColor: store.colorTypes[item] }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && <Modal setShowModal={setShowModal} pokemon={pokemon} />}
    </>
  )
}

export default observer(Card)
