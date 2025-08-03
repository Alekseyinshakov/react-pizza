import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SortState {
  sortIndex: number
  sortOrder: string
}

const initialState: SortState = {
  sortIndex: 0,
  sortOrder: 'desc',
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setActiveSort: (state, action: PayloadAction<number>) => {
      state.sortIndex = action.payload
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload
    },
  },
})

export const { setActiveSort, setSortOrder } = sortSlice.actions

export default sortSlice.reducer
