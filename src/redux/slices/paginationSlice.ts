import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PaginationState {
  value: number
}

const initialState: PaginationState = {
  value: 1,
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export const { setCurrentPage } = paginationSlice.actions

export default paginationSlice.reducer
