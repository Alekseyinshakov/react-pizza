import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store.ts'
import { setActiveSort, setSortOrder } from '../redux/slices/sortSlice.ts'

const Sort = () => {
  const activeSort = useSelector((state: RootState) => state.sortReducer.sortIndex)
  const currentSortOrder = useSelector((state: RootState) => state.sortReducer.sortOrder)

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const sortVariants = ['популярности', 'цене', 'алфавиту']

  function handlerSortClick(id: number) {
    dispatch(setActiveSort(id))
    setOpen(false)
  }

  function changeOrderHandler() {
    let order: string = ''
    if (currentSortOrder === 'desc') {
      order = 'asc'
    } else {
      order = 'desc'
    }
    dispatch(setSortOrder(order))
  }

  return (
    <div className='sort'>
      <div className='sort__label'>
        <svg
          onClick={() => changeOrderHandler()}
          className={`sort__arrow-svg ${currentSortOrder === 'desc' && 'desc'}`}
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setOpen(!open)
          }}
        >
          {sortVariants[activeSort]}
        </span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortVariants.map((sortItem, index) => {
              return (
                <li
                  onClick={() => {
                    handlerSortClick(index)
                  }}
                  className={index === activeSort ? 'active' : ''}
                >
                  {sortItem}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
