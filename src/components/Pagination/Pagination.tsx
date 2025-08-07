import s from './Pagination.module.scss'
import PrevArrow from '../../assets/icons/arrow-prev.svg?react'
import NextArrow from '../../assets/icons/arrow-next.svg?react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store.ts'
import { setCurrentPage } from '../../redux/slices/paginationSlice.ts'

type PaginationProps = {
  totalItems: number
  limit: number
}

const Pagination = ({ totalItems, limit }: PaginationProps) => {
  const currentPage = useSelector((state: RootState) => state.paginationReducer.value)
  const dispatch = useDispatch()
  const totalPages = Math.ceil(totalItems / limit)

  function nextHandler() {
    dispatch(setCurrentPage(currentPage + 1))
  }

  function prevHandler() {
    dispatch(setCurrentPage(currentPage - 1))
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
