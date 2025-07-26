import s from './Search.module.scss'
import searchSvg from '../../assets/icons/search-svgrepo-com.svg'
import crossSvg from '../../assets/icons/cross-svgrepo-com.svg'
import React, { type ChangeEvent, useRef } from 'react'

type SearchProps = {
  searchString: string
  setSearchString: (str: string) => void
}

const Search = ({ searchString, setSearchString }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const focusInput = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    inputRef.current?.focus()
  }

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
  }

  return (
    <div className={s.root}>
      <img onMouseDown={focusInput} src={searchSvg} alt='Search' className={s.icon} />
      <input ref={inputRef} type='text' value={searchString} onChange={changeInputHandler} />
      {searchString && (
        <img
          src={crossSvg}
          alt='Cross'
          className={s.cross}
          onClick={() => {
            setSearchString('')
          }}
          onMouseDown={focusInput}
        />
      )}
    </div>
  )
}

export default Search
