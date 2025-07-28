import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CategoryState {
  value: number
}

const initialState: CategoryState = {
  value: 0,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    seyCategoryIndex: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export const { seyCategoryIndex } = categorySlice.actions

export default categorySlice.reducer
