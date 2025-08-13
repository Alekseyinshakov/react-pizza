import axios from 'axios'
import qs from 'qs'

import Categories from '../components/Categories.tsx'
import Sort from '../components/Sort.tsx'
import PizzaSkeleton from '../components/PizzaSkeleton.tsx'
import PizzaBlock from '../components/PizzaBlock.tsx'
import { useEffect, useRef, useState } from 'react'
import type { PizzaType } from '../types.ts'
import Pagination from '../components/Pagination/Pagination.tsx'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store.ts'
import { useNavigate } from 'react-router'
import { setActiveCategory } from '../redux/slices/categorySlice.ts'
import {
  setActiveSort,
  setSortOrder,
} from '../redux/slices/sortSlice.ts'
import { setCurrentPage } from '../redux/slices/paginationSlice.ts'
import { getProducts } from '../redux/slices/productSlice.ts'

const Main = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const activeCategory = useSelector(
    (state: RootState) => state.categoryReducer.value
  )
  const searchString = useSelector(
    (state: RootState) => state.searchReducer.value
  )
  const activeSort = useSelector(
    (state: RootState) => state.sortReducer.sortIndex
  )
  const sortOrder = useSelector(
    (state: RootState) => state.sortReducer.sortOrder
  )
  const currentPage = useSelector(
    (state: RootState) => state.paginationReducer.value
  )

  const [products, setProducts] = useState<PizzaType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const sortVariants = ['rating', 'price', 'title']

  const fetchPizzas = () => {
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

    setTimeout(() => {
      dispatch(
        getProducts({
          activeCategory,
          currentPage,
          sortVariants,
          activeSort,
          sortOrder,
          searchString,
        })
      )
    }, 1500)
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      console.log(params)
      if (params.activeCategory) {
        dispatch(setActiveCategory(+params.activeCategory))
      }
      if (params.sortOrder) {
        dispatch(setSortOrder('' + params.sortOrder))
      }
      if (params.activeSort) {
        dispatch(setActiveSort(+params.activeSort))
      }
      if (params.currentPage) {
        dispatch(setCurrentPage(+params.currentPage))
      }
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        activeCategory,
        activeSort,
        sortOrder,
        currentPage,
      })
      navigate(`?${params}`)
    }
    isMounted.current = true
  }, [activeCategory, activeSort, sortOrder, currentPage])

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
  }, [
    activeCategory,
    activeSort,
    sortOrder,
    searchString,
    currentPage,
  ])

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
