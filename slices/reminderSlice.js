import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reminders: [],
};

export const reminderSlice = createSlice({
    name: 'reminder',
    initialState,
    reducers: {
        addReminder: (state, action) => {
            state.reminders = [action.payload, ...state.reminders];
        },
        deleteReminder: (state, action) => {
            const idToDelete = action.payload;
            state.reminders = state.reminders.filter((item) => item.id !== idToDelete);
        },
    },
});

export const { addReminder, deleteReminder } = reminderSlice.actions;

export const selectReminders = (state) => state.reminder.reminders;

export default reminderSlice.reducer;
