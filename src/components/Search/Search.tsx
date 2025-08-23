import debounce from 'lodash.debounce'

import s from './Search.module.scss'
import searchSvg from '../../assets/icons/search-svgrepo-com.svg'
import crossSvg from '../../assets/icons/cross-svgrepo-com.svg'
import React, {
  type ChangeEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import { setSearchString } from '../../redux/slices/searchSlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux/store.ts'
import { setCurrentPage } from '../../redux/slices/paginationSlice.ts'

const Search = () => {
  const searchString = useSelector(
    (state: RootState) => state.searchReducer.value
  )
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState('')

  const sendQuery = useCallback(
    debounce((value: string) => {
      dispatch(setSearchString(value))
      dispatch(setCurrentPage(1))
    }, 1000),
    []
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const focusInput = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    inputRef.current?.focus()
  }

  const changeInputHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value)
    // dispatch(setSearchString(event.target.value))
    sendQuery(event.target.value)
  }

  return (
    <div className={s.root}>
      <img
        onMouseDown={focusInput}
        src={searchSvg}
        alt='Search'
        className={s.icon}
      />
      <input
        ref={inputRef}
        type='text'
        value={inputValue}
        onChange={changeInputHandler}
      />
      {searchString && (
        <img
          src={crossSvg}
          alt='Cross'
          className={s.cross}
          onClick={() => {
            dispatch(setSearchString(''))
            setInputValue('')
          }}
          onMouseDown={focusInput}
        />
      )}
    </div>
  )
}

export default Search
