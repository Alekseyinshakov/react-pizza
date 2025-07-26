import s from './Pagination.module.scss'
import PrevArrow from '../../assets/icons/arrow-prev.svg?react'
import NextArrow from '../../assets/icons/arrow-next.svg?react'

type PaginationProps = {
  currentPage: number
  updatePage: (num: number) => void
  totalItems: number
  limit: number
}

const Pagination = ({ currentPage, updatePage, totalItems, limit }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / limit)

  function nextHandler() {
    updatePage(currentPage + 1)
  }

  function prevHandler() {
    updatePage(currentPage - 1)
  }

  return (
    <div className={s.root}>
      <button
        disabled={currentPage === 1 ? true : false}
        onClick={() => {
          prevHandler()
        }}
      >
        <PrevArrow />
      </button>
      <span>{currentPage}</span>
      <button
        disabled={currentPage === totalPages ? true : false}
        onClick={() => {
          nextHandler()
        }}
      >
        <NextArrow />
      </button>
    </div>
  )
}

export default Pagination
