import { configureStore } from '@reduxjs/toolkit'
import growthSlice from '../slices/growthSlice'

export const store = configureStore({
  reducer: {
    growth: growthSlice,
  },
})