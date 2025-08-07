import { Link } from 'react-router'

const CartEmpty = () => {
  return (
    <div className='cart cart--empty'>
      <h2 className='cart--empty-title'>Корзина пустая 😕</h2>
      <p>
        Вероятнее всего, вы ещё не добавляли пиццу в корзину.
        <br />
        Чтобы добавить пиццу, перейдите на главную страницу.
      </p>
      <img src='/img/empty-cart.png' alt='Empty cart' />
      <Link to='/' className='button button--black'>
        <span>Вернуться назад</span>
      </Link>
    </div>
  )
}

export default CartEmpty
