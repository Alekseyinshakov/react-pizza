import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SortState {
  sortIndex: number
}

const initialState: SortState = {
  sortIndex: 0,
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setActiveSort: (state, action: PayloadAction<number>) => {
      state.sortIndex = action.payload
    },
  },
})

export const { setActiveSort } = sortSlice.actions

export default sortSlice.reducer
