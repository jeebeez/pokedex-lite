import ReactPaginate from "react-paginate"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import store from "../store"

// re-used styles while paginating

const previousStyle =
  "border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
const nextStyle =
  "border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
const pageStyle =
  "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
const currentStyle =
  "border-indigo-500 text-indigo-600 border-t-2  px-4 inline-flex items-center text-sm font-medium"

function Pagination() {
  const handlePageClick = (data: any) => {
    store.setCurrentPage(data.selected)
    store.fetchCurrentPage(data.selected)
  }

  useEffect(() => {
    store.setCurrentPage(0)
    store.fetchPokemon()
    // eslint-disable-next-line
  }, [store.perPage])

  return (
    <ReactPaginate
      previousLabel='Previous'
      nextLabel='Next'
      breakLabel='...'
      pageCount={store.totalPages}
      forcePage={store.currentPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName='border-t border-gray-200 px-4 mx-4 my-6 flex items-center justify-center sm:px-0'
      pageClassName='hidden md:-mt-px md:flex'
      pageLinkClassName={pageStyle}
      previousClassName='-mt-px mr-3 flex'
      previousLinkClassName={previousStyle}
      nextClassName='-mt-px ml-3 flex'
      nextLinkClassName={nextStyle}
      breakClassName='hidden md:-mt-px md:flex'
      breakLinkClassName={pageStyle}
      activeClassName={currentStyle}
    />
  )
}

export default observer(Pagination)
