import './styles/app.scss'
import Header from './components/Header.tsx'
import Categories from './components/Categories.tsx'
import Sort from './components/Sort.tsx'
import PizzaBlock from './components/PizzaBlock.tsx'
import pizzas from './assets/pizzas.json'

function App() {
  console.log(pizzas)
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
              {pizzas.map((obj) => {
                return <PizzaBlock title={obj.title} price={obj.price} img={obj.imageUrl} />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
