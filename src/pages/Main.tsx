import axios from 'axios'

import Categories from '../components/Categories.tsx'
import Sort from '../components/Sort.tsx'
import PizzaSkeleton from '../components/PizzaSkeleton.tsx'
import PizzaBlock from '../components/PizzaBlock.tsx'
import { useEffect, useState } from 'react'
import type { PizzaType } from '../types.ts'
import Pagination from '../components/Pagination/Pagination.tsx'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store.ts'

const Main = () => {
  const activeCategory = useSelector((state: RootState) => state.categoryReducer.value)
  const searchString = useSelector((state: RootState) => state.searchReducer.value)
  const activeSort = useSelector((state: RootState) => state.sortReducer.sortIndex)
  const sortOrder = useSelector((state: RootState) => state.sortReducer.sortOrder)
  const currentPage = useSelector((state: RootState) => state.paginationReducer.value)

  const [products, setProducts] = useState<PizzaType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const sortVariants = ['rating', 'price', 'title']

  useEffect(() => {
    let URL = `https://68769703814c0dfa653c9f80.mockapi.io/products?limit=4&page=${currentPage}&sortBy=${sortVariants[activeSort]}&order=${sortOrder}`
    if (activeCategory) {
      URL += `&category=${activeCategory}`
    }
    if (searchString) {
      URL += `&search=${searchString}`
    }

    setIsLoading(true)

    axios
      .get(URL)
      .then(function (response) {
        setProducts(response.data)
      })
      .catch(function (error) {
        setProducts([])
        console.log(error)
      })
      .finally(function () {
        setIsLoading(false)
      })
  }, [activeCategory, activeSort, sortOrder, searchString, currentPage])

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
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
      <Pagination totalItems={10} limit={4} />
    </>
  )
}

export default Main
