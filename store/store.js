import { configureStore } from '@reduxjs/toolkit'
import growthSlice from '../slices/growthSlice'
import milestoneSlice from "../slices/milestoneSlice";
import reminderSlice from "../slices/reminderSlice";

export const store = configureStore({
  reducer: {
    growth: growthSlice,
    milestone: milestoneSlice,
    reminder: reminderSlice,
  },
})