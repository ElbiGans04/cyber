import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './features/data/dataReducer'
import cartReducer from './features/cart/cartReducer'
const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    data: dataReducer,
    cart: cartReducer
  }
})

export type TypeGetState = typeof store.getState
export type TypeDispatch = typeof store.dispatch

export default store