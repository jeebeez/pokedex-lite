import { useRef } from "react"
import ReactDom from "react-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { v4 as uuid } from "uuid"
import store from "../store"

import { ModalProps, StatsProps } from "../interfaces/types"
import capitalize from "../utils/capitalize"
import StatBar from "./StatBar"

function Modal({ setShowModal, pokemon }: ModalProps) {
  const { name, imageUrl, type, stat } = pokemon

  const modalRoot = document.getElementById("portal") as HTMLElement

  // close the modal when clicking outside the modal.
  const modalRef = useRef<HTMLDivElement>(null)

  // @ts-ignore-next-line
  const closeModal = (event) => {
    if ((event.button === 0 || event.code === "Enter") && event.target === modalRef.current) {
      setShowModal(false)
    }
  }

  const renderStats = () =>
    stat.map((item: StatsProps) => <StatBar header={item.statName} value={item.value} max={300} />)

  // render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div
      ref={modalRef}
      onClick={closeModal}
      onKeyDown={closeModal}
      tabIndex={0}
      role='button'
      className='fixed font-mono top-0 left-0 right-0 z-50 flex w-full overflow-x-hidden bg-opacity-70 bg-slate-900 overflow-y-auto h-full justify-center items-center'
    >
      <div className='rounded-lg  w-10/12 p-4 sm:w-full relative flex items-center bg-white overflow-hidden shadow-2xl md:p-6 lg:p-8 md:inline-block md:max-w-2xl md:px-4 lg:max-w-4xl'>
        <button
          type='button'
          className='absolute top-4 right-4 z-10 text-red-500 font-semibold hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8'
          onClick={() => setShowModal(false)}
        >
          <span className='sr-only'>Close</span>X
        </button>

        <div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
          <div className='sm:col-span-4 lg:col-span-5'>
            <div className='aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden'>
              <LazyLoadImage
                className='w-full h-full object-center object-cover'
                alt={name}
                effect='blur'
                src={imageUrl}
              />
            </div>
          </div>
          <section
            aria-labelledby='information-heading'
            className='flex flex-col justify-between sm:col-span-8 lg:col-span-7 h-full'
          >
            <h3 className='sr-only'>Pokemon Stats</h3>
            <div>
              <h2 className='text-2xl font-extrabold text-gray-900 sm:pr-12'>{capitalize(name)}</h2>

              <div className='flex-1 p-4 space-y-2 flex items-center justify-center	 flex-col select-none'>
                <div className=' flex gap-3 '>
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
            <div className='flex flex-col gap-2'>{renderStats()}</div>
          </section>
        </div>
      </div>
    </div>,
    modalRoot
  )
}

export default Modal
