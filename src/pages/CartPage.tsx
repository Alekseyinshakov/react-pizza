import CartItem from '../components/CartItem/CartItem.tsx'

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../redux/store.ts'
import CartIcon from '../assets/icons/cartIcon.svg?react'
import ClearCart from '../assets/icons/clearCart.svg?react'
import { clearCart } from '../redux/slices/cartSlice.ts'

const CartPage = () => {
  const cartPizzas = useSelector((state: RootState) => state.cartReducer.pizzas)
  const totalPrice = useSelector((state: RootState) => state.cartReducer.totalPrice)

  const dispatch = useDispatch()

  const totalPizzasCount = cartPizzas.reduce((acc: number, curr) => {
    return acc + curr.count
  }, 0)

  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  return (
    <div className='cart'>
      <div className='cart__top'>
        <h2 className='content__title'>
          <CartIcon />
          Корзина
        </h2>
        <div
          onClick={() => {
            clearCartHandler()
          }}
          className='cart__clear'
        >
          <ClearCart />
          <span>Очистить корзину</span>
        </div>
      </div>

      <div className='cart__items'>
        {cartPizzas.map((props) => {
          return <CartItem key={props.cartPizzaId} {...props} />
        })}
      </div>

      <div className='cart__bottom'>
        <div className='cart__bottom-details'>
          <span>
            {' '}
            Всего пицц: <b>{totalPizzasCount}</b>{' '}
          </span>
          <span>
            {' '}
            Сумма заказа: <b>{totalPrice}</b>{' '}
          </span>
        </div>
        <div className='cart__bottom-buttons'>
          <a href='/' className='button button--outline button--add go-back-btn'>
            <svg
              width='8'
              height='14'
              viewBox='0 0 8 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7 13L1 6.93015L6.86175 1'
                stroke='#D3D3D3'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <span>Вернуться назад</span>
          </a>
          <div className='button pay-btn'>
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
