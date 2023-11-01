import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    milestone: [],
};

export const milestoneSlice = createSlice({
    name: 'milestone',
    initialState,
    reducers: {
        setMilestone: (state, action) => { // action.payload is an array of objects
            const reversedPayload = action.payload.slice().reverse();
            state.milestone = [...reversedPayload];
            // state.milestone = action.payload;
        },
        addMilestone: (state, action) => {
            state.milestone =  [action.payload, ...state.milestone]
            //   state.milestone.push(action.payload);
        },
        updateMilestone: (state, action) => {
            const { id, measurement } = action.payload;
            const index = state.milestone.findIndex((item) => item.id === id);
            if (index !== -1) {
                const { weight, height, headCircumference } = measurement;
                if (weight !== undefined) {
                    state.milestone[index].weight = weight;
                }
                if (height !== undefined) {
                    state.milestone[index].height = height;
                }
                if (headCircumference !== undefined) {
                    state.milestone[index].headCircumference = headCircumference;
                }
            }
        },
        deleteMilestone: (state, action) => {
            const idToDelete = action.payload;
            state.milestone = state.milestone.filter((item) => item.id !== idToDelete);
        },
    },
});

export const { setMilestone, addMilestone, deleteMilestone, updateMilestone } = milestoneSlice.actions;

export const selectMilestone = state => state.milestone.milestone;
export const selectMilestonesById = (state,id) => state.milestone.milestone.filter(milestons=> milestone.id == id);

export default milestoneSlice.reducer;

// addExpense: ({ description, amount, date }) => {},
// setExpenses: (expenses) => {},
// deleteExpense: (id) => {},
// updateExpense: (id, { description, amount, date }) => {},