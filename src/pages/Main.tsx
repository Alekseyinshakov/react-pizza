import Categories from '../components/Categories.tsx'
import Sort from '../components/Sort.tsx'
import PizzaSkeleton from '../components/PizzaSkeleton.tsx'
import PizzaBlock from '../components/PizzaBlock.tsx'
import { useEffect, useState } from 'react'
import type { PizzaType } from '../types.ts'

const Main = () => {
  const [products, setProducts] = useState<PizzaType[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [activeCategory, setActiveCategory] = useState(0)

  const [activeSort, setActiveSort] = useState(0)

  const sortVriants = ['rating', 'price', 'title']

  useEffect(() => {
    let URL = `https://68769703814c0dfa653c9f80.mockapi.io/products?sortBy=${sortVriants[activeSort]}&order=desc`
    if (activeCategory) {
      URL += `&category=${activeCategory}`
    }
    setIsLoading(true)

    fetch(URL)
      .then((res) => {
        return res.json()
      })
      .then((data: PizzaType[]) => {
        setProducts(data)
        setIsLoading(false)
      })
  }, [activeCategory, activeSort])

  return (
    <>
      <div className='content__top'>
        <Categories {...{ activeCategory, setActiveCategory }} />
        <Sort {...{ activeSort, setActiveSort }} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? new Array(8).fill(7).map((_, index) => {
              return <PizzaSkeleton key={index} />
            })
          : products.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />
            })}
      </div>
    </>
  )
}

export default Main
