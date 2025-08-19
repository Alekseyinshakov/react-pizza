export type PizzaType = {
  id: string
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
    id: string
    size: number
    type: number
    imageUrl: string
    price: number
  }
  count: number
}

export type AddPizzaType = {
  id: string
  imageUrl: string
  type: number
  size: number
  price: number
  title: string
}

export type fetchParams = {
  activeCategory: number
  currentPage: number
  sortVariants: string[]
  activeSort: number
  sortOrder: string
  searchString: string
}
