import { useState } from 'react'
import type { AddPizzaType, PizzaType } from '../types.ts'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../redux/slices/cartSlice.ts'
import type { RootState } from '../redux/store.ts'

const typeNames = ['тонкое', 'традиционное']

const PizzaBlock = ({ id, title, price, imageUrl, sizes, types }: PizzaType) => {
  const [size, setSize] = useState(sizes[0])
  const [typesIndex, setTypesIndex] = useState(0)

  const cartPizzas = useSelector((state: RootState) => state.cartReducer.pizzas)

  const thisPizzaInCart = cartPizzas.find((item) => {
    if (item.details.id === id && item.details.size === size && item.details.type === typesIndex) {
      return true
    }
    return false
  })

  const variantPizzaCounter = thisPizzaInCart && thisPizzaInCart.count

  const dispatch = useDispatch()

  const addButtonHandler = () => {
    const newPizza: AddPizzaType = {
      id,
      imageUrl,
      type: typesIndex,
      size,
      price,
      title,
    }

    dispatch(addProduct(newPizza))
  }

  return (
    <div className='pizza-block'>
      <img className='pizza-block__image' src={imageUrl} alt='PizzaBlock' />
      <h4 className='pizza-block__title'>{title}</h4>
      <div className='pizza-block__selector'>
        <ul>
          {types.map((type) => {
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
          {sizes.map((item, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  setSize(sizes[i])
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
        className='pizza-block__bottom'
      >
        <div className='pizza-block__price'>от {price} ₽</div>
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
  )
}

export default PizzaBlock
