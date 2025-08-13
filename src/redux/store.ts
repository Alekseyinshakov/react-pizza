import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice.ts'
import searchReducer from './slices/searchSlice.ts'
import sortReducer from './slices/sortSlice.ts'
import paginationReducer from './slices/paginationSlice.ts'
import cartReducer from './slices/cartSlice.ts'
import productsReducer from './slices/productSlice.ts'

export const store = configureStore({
  reducer: {
    categoryReducer,
    searchReducer,
    sortReducer,
    paginationReducer,
    cartReducer,
    productsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
