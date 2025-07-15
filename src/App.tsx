import './styles/app.scss'
import Header from './components/Header.tsx'
import Categories from './components/Categories.tsx'
import Sort from './components/Sort.tsx'
import PizzaBlock from './components/PizzaBlock.tsx'
import { useEffect, useState } from 'react'
import type { PizzaType } from './types.ts'

function App() {
  const [products, setProducts] = useState<PizzaType[]>([])

  useEffect(() => {
    fetch('https://68769703814c0dfa653c9f80.mockapi.io/products')
      .then((res) => {
        return res.json()
      })
      .then((data: PizzaType[]) => {
        setProducts(data)
      })
  }, [])

  return (
    <>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              {products.map((obj) => {
                return <PizzaBlock key={obj.id} {...obj} />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
