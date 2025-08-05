import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { cartPizzaType, AddPizzaType } from '../../types.ts'

export interface CartState {
  pizzas: cartPizzaType[]
  totalPrice: number
}

const initialState: CartState = {
  pizzas: [
    {
      cartPizzaId: '1',
      props: {
        title: 'Пепперони',
        id: 15,
        size: 26,
        type: 0,
        imageUrl:
          'https://raw.githubusercontent.com/Alekseyinshakov/react-pizza/refs/heads/develop/public/img/pizzas-img/pizza-2.jpg',
        price: 777,
      },
      count: 2,
    },
    {
      cartPizzaId: '2',
      props: {
        title: 'React-пицца',
        id: 16,
        size: 30,
        type: 1,
        imageUrl:
          'https://raw.githubusercontent.com/Alekseyinshakov/react-pizza/refs/heads/develop/public/img/pizzas-img/pizza-1.jpg',
        price: 666,
      },
      count: 3,
    },
  ],
  totalPrice: 1300,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<AddPizzaType>) => {
      const pizzaInCart = state.pizzas.find((item) => {
        return (
          item.props.id === action.payload.id &&
          item.props.type === action.payload.type &&
          item.props.size === action.payload.size
        )
      })

      if (pizzaInCart) {
        pizzaInCart.count++
      } else {
        const newPizza: cartPizzaType = {
          cartPizzaId: crypto.randomUUID(),
          count: 0,
          props: {
            id: action.payload.id,
            imageUrl: action.payload.imageUrl,
            type: action.payload.type,
            size: action.payload.size,
            price: action.payload.price,
            title: action.payload.title,
          },
        }
        state.pizzas.push(newPizza)
      }
    },
  },
})

export const { addProduct } = cartSlice.actions

export default cartSlice.reducer
