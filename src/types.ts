export type PizzaType = {
  id: number
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

export type cartPizzaType = {
  cartPizzaId: string
  details: {
    title: string
    id: number
    size: number
    type: number
    imageUrl: string
    price: number
  }
  count: number
}

export type AddPizzaType = {
  id: number
  imageUrl: string
  type: number
  size: number
  price: number
  title: string
}
