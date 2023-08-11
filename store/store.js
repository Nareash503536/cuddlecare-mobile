import { configureStore } from '@reduxjs/toolkit'
import growthSlice from '../slices/growthSlice'
import milestoneSlice from "../slices/milestoneSlice";

export const store = configureStore({
  reducer: {
    growth: growthSlice,
    milestone: milestoneSlice,
  },
})