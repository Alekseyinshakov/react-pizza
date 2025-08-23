import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { fetchParams, PizzaType } from '../../types.ts'
import axios from 'axios'

export const getProducts = createAsyncThunk(
  'pizzas/getProducts',
  async (params: fetchParams) => {
    const {
      activeCategory,
      currentPage,
      sortVariants,
      activeSort,
      sortOrder,
      searchString,
    } = params

    let URL = `https://react-pizza-api-one.vercel.app/products?_limit=4&_page=${currentPage}&_sort=${sortVariants[activeSort]}&_order=${sortOrder}`
    if (activeCategory) {
      URL += `&category=${activeCategory}`
    }
    if (searchString) {
      URL += `&q=${searchString}`
    }

    const response = await axios.get(URL)

    return response.data
  }
)

export interface ProductState {
  products: PizzaType[]
  status: 'loading' | 'success' | 'error'
  error: string | null
}

const initialState: ProductState = {
  products: [],
  status: 'loading',
  error: null,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<PizzaType[]>) => {
      state.products = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.products = []
        state.status = 'loading'
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.status = 'success'
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export const { setProducts } = productSlice.actions

export default productSlice.reducer
