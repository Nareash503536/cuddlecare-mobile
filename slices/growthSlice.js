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

// find growth rate
function calculateBMI(height, weight) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
}

function getGrowthCategory(bmi) {
    if (bmi < 15) {
        return 'Very severely underweight';
    } else if (bmi < 16) {
        return 'Severely underweight';
    } else if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else if (bmi < 35) {
        return 'Obese Class I (moderately obese)';
    } else if (bmi < 40) {
        return 'Obese Class II (severely obese)';
    } else {
        return 'Obese Class III (very severely obese)';
    }
}


export const selectBMIAndGrowthCategory = state => {
    const growth = state.growth.growth;
    const latestMeasurement = growth[0];

    if (!latestMeasurement || !latestMeasurement.height || !latestMeasurement.weight) {
        return 0;
    }

    const bmi = calculateBMI(latestMeasurement.height, latestMeasurement.weight);
    const growthCategory = getGrowthCategory(bmi);

    return { bmi, growthCategory };
};


export const selectGrowthRate = (state, type) => {
    const growth = state.growth.growth;
    const latestMeasurement = growth[0];
    const previousMeasurement = growth[1];

    if (!latestMeasurement || !previousMeasurement) {
        return null;
    }

    const latestValue = latestMeasurement[type];
    const previousValue = previousMeasurement[type];

    if (!latestValue || !previousValue) {
        return null;
    }

    const growthRate = ((latestValue - previousValue) / previousValue)* 100;

    return growthRate.toFixed(1);
};
/////////////////
export const selectHeightGrowthRate = state => selectGrowthRate(state, 'height');
export const selectWeightGrowthRate = state => selectGrowthRate(state, 'weight');
export const selectHeadCircumferenceGrowthRate = state => selectGrowthRate(state, 'headCircumference');


export const { setGrowth, addGrowth, deleteGrowth, updateGrowth } = growthSlice.actions;

export const selectGrowth = state => state.growth.growth;
export const selectGrowthById = (state,id) => state.growth.growth.filter(growth=> growth.id == id);

export default growthSlice.reducer;

