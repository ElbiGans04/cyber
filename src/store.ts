import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './features/data/dataReducer'

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    data: dataReducer
  }
})

export default store