import Categories from '../components/Categories.tsx'
import Sort from '../components/Sort.tsx'
import PizzaSkeleton from '../components/PizzaSkeleton.tsx'
import PizzaBlock from '../components/PizzaBlock.tsx'
import { useContext, useEffect, useState } from 'react'
import type { PizzaType } from '../types.ts'
import Pagination from '../components/Pagination/Pagination.tsx'
import { MyContext } from '../MyContext.ts'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store.ts'

const Main = () => {
  const activeCategory = useSelector((state: RootState) => state.categoryReducer.value)

  const { searchString } = useContext(MyContext)

  const [products, setProducts] = useState<PizzaType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [activeSort, setActiveSort] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const sortVariants = ['rating', 'price', 'title']

  useEffect(() => {
    let URL = `https://68769703814c0dfa653c9f80.mockapi.io/products?limit=4&page=${currentPage}&sortBy=${sortVariants[activeSort]}&order=desc`
    if (activeCategory) {
      URL += `&category=${activeCategory}`
    }
    if (searchString) {
      URL += `&search=${searchString}`
    }

    setIsLoading(true)

    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            return []
          }
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.json()
      })
      .then((data: PizzaType[]) => {
        setProducts(data)
        setIsLoading(false)
      })
  }, [activeCategory, activeSort, searchString, currentPage])

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort {...{ activeSort, setActiveSort }} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? new Array(4).fill(7).map((_, index) => {
              return <PizzaSkeleton key={index} />
            })
          : products.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />
            })}
      </div>
      <Pagination
        totalItems={10}
        limit={4}
        currentPage={currentPage}
        updatePage={(num) => {
          setCurrentPage(num)
        }}
      />
    </>
  )
}

export default Main
