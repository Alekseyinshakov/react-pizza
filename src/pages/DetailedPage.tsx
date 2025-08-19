import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { PizzaType } from '../types.ts'
import axios from 'axios'
import { MoonLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store.ts'

const typeNames = ['тонкое', 'традиционное']

type StatusType = 'loading' | 'success' | 'error'

const DetailedPage = () => {
  const { id } = useParams<{ id: string }>()

  const [pizzaData, setPizzaData] = useState<null | PizzaType>()
  const [status, setStatus] = useState<StatusType>('loading')

  const [size, setSize] = useState(pizzaData?.sizes[0])
  const [typesIndex, setTypesIndex] = useState(0)

  const cartPizzas = useSelector(
    (state: RootState) => state.cartReducer.pizzas
  )

  let [variantPizzaCounter, setvariantPizzaCounter] = useState<
    number | undefined
  >(undefined)

  const addButtonHandler = () => {
    console.log('add pizza')
  }

  useEffect(() => {
    const getPizza = async () => {
      try {
        const response = await axios.get(
          `https://68769703814c0dfa653c9f80.mockapi.io/products/${id}`
        )
        setPizzaData(response.data)
        setStatus('success')
        setSize(response.data.sizes[0])
      } catch (error) {
        console.log('Error:', error)
      }
    }
    getPizza()
  }, [id])

  useEffect(() => {
    const thisPizzaInCart = cartPizzas.find((item) => {
      console.log(item)
      if (
        item.details.id === id &&
        item.details.size === size &&
        item.details.type === typesIndex
      ) {
        return true
      }
      return false
    })

    setvariantPizzaCounter(thisPizzaInCart && thisPizzaInCart.count)

    console.log(variantPizzaCounter)
  }, [size, typesIndex])

  return (
    <div className='detailed__container'>
      {status === 'loading' && (
        <div className='preloader-container'>
          <MoonLoader color='#36d7b7' size={50} />
        </div>
      )}

      {status === 'success' && (
        <div className='detailed__inner'>
          <div className='detailed__column'>
            <h2 className='title'>{pizzaData?.title}</h2>
            <img src={pizzaData?.imageUrl} alt='pizza-image' />
          </div>
          <div className='detailed__column'>
            <h3 className='detailed__subtitle'>Ингридиенты:</h3>
            <ul className='detailed__ingredients'>
              <li>Тесто - тонкое классическое</li>
              <li>Соус томатный</li>
              <li>Сыр моцарелла</li>
              <li>Колбаса пепперони</li>
              <li>Орегано</li>
            </ul>
            <div className='pizza-block__selector detailed__selector'>
              <ul>
                {pizzaData?.types.map((type) => {
                  return (
                    <li
                      key={type}
                      onClick={() => {
                        setTypesIndex(type)
                      }}
                      className={type === typesIndex ? 'active' : ''}
                    >
                      {typeNames[type]}
                    </li>
                  )
                })}
              </ul>
              <ul>
                {pizzaData?.sizes.map((item, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => {
                        setSize(pizzaData?.sizes[i])
                      }}
                      className={item === size ? 'active' : ''}
                    >
                      {item} см
                    </li>
                  )
                })}
              </ul>
            </div>
            <div
              onClick={() => {
                addButtonHandler()
              }}
              className='pizza-block__bottom pizza-block__bottom-detailed'
            >
              <div className='pizza-block__price'>
                от {pizzaData?.price} ₽
              </div>
              <div className='button button--outline button--add'>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                    fill='white'
                  />
                </svg>
                <span>Добавить</span>
                {variantPizzaCounter && <i>{variantPizzaCounter}</i>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailedPage
