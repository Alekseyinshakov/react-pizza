import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { fetchParams, PizzaType } from '../../types.ts'
import axios from 'axios'

export const getProducts = createAsyncThunk(
  'pizzas/getProducts',
  async (params: fetchParams) => {
    console.log('here 2')

    const {
      activeCategory,
      currentPage,
      sortVariants,
      activeSort,
      sortOrder,
      searchString,
    } = params

    let URL = `https://68769703814c0dfa653c9f80.mockapi.io/products?limit=4&page=${currentPage}&sortBy=${sortVariants[activeSort]}&order=${sortOrder}`
    if (activeCategory) {
      URL += `&category=${activeCategory}`
    }
    if (searchString) {
      URL += `&search=${searchString}`
    }

    const response = await axios.get(URL)

    return response.data
  }
)

export interface ProductState {
  products: PizzaType[]
  status: 'loading' | 'success' | 'error'
}

const initialState: ProductState = {
  products: [],
  status: 'loading',
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
      .addCase(getProducts.rejected, (state) => {
        state.products = []
        state.status = 'error'
      })
  },
})

export const { setProducts } = productSlice.actions

export default productSlice.reducer
