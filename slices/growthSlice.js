import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  growth: [],
};

export const growthSlice = createSlice({
  name: 'growth',
  initialState,
  reducers: {
    setGrowth: (state, action) => { // action.payload is an array of objects
        const reversedPayload = action.payload.slice().reverse();
        state.growth = [...reversedPayload];
        // state.growth = action.payload;
    },
    addGrowth: (state, action) => {
        state.growth =  [action.payload, ...state.growth]
    //   state.growth.push(action.payload);
    },
    updateGrowth: (state, action) => {
        const { id, measurement } = action.payload;
        const index = state.growth.findIndex((item) => item.id === id);
        if (index !== -1) {
          const { weight, height, headCircumference } = measurement;
          if (weight !== undefined) {
            state.growth[index].weight = weight;
          }
          if (height !== undefined) {
            state.growth[index].height = height;
          }
          if (headCircumference !== undefined) {
            state.growth[index].headCircumference = headCircumference;
          }
        }
    },
    deleteGrowth: (state, action) => {
        const idToDelete = action.payload;
        state.growth = state.growth.filter((item) => item.id !== idToDelete);
    },
  },
});

export const { setGrowth, addGrowth, deleteGrowth, updateGrowth } = growthSlice.actions;

export const selectGrowth = state => state.growth.growth;
export const selectGrowthById = (state,id) => state.growth.growth.filter(growth=> growth.id == id);

export default growthSlice.reducer;

