import './styles/app.scss'
import Header from './components/Header.tsx'
import Categories from './components/Categories.tsx'
import Sort from './components/Sort.tsx'
import PizzaBlock from './components/PizzaBlock.tsx'

function App() {
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
              <PizzaBlock title='Милано' price={500} />
              <PizzaBlock title='Мясная' price={600} />
              <PizzaBlock title='Марио' price={400} />
              <PizzaBlock title='ICE пицца' price={540} />
              <PizzaBlock title='4 Сыра' price={510} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
