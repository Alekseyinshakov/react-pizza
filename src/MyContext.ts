import React from 'react'

interface MyContextType {
  searchString: string
  setSearchString: (str: string) => void
}

export const MyContext = React.createContext<MyContextType>({
  searchString: '',
  setSearchString: () => {},
})
