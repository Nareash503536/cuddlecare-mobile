import {getFormattedDate} from "../../util/date";

export const DUMMY_GROWTH =[
    {
        id: 'e1',
        weight:5,
        height: 10,
        headCircumference: 15,
        description: "Midwife emphasized the importance of a balanced diet at this stage. Baby is transitioning to solid foods well. Continue offering a variety of foods, including fruits, vegetables, grains, and proteins",
        date: getFormattedDate(new Date(2023, 4, 29)),
    },
    {
        id: 'e2',
        weight:10,
        height: 20,
        headCircumference: 25,
        description: "Mentioned that baba's speech development is on track. Encourage his language skills by talking to him, reading books together, and naming objects around him",
        date: getFormattedDate(new Date(2023, 2, 6)),
    },
    {
        id: 'e3',
        weight:15,
        height: 30,
        headCircumference: 35,
        description: "Emphasized the significance of active playtime. Baby should be engaging in physical activities to enhance his motor skills and overall physical development",
        date: getFormattedDate(new Date(2022, 12, 22)),
    },
    {
        id: 'e4',
        weight:20,
        height: 40,
        headCircumference: 45,
        description: "Recommended maintaining a consistent sleep schedule. Ensure baby is getting around 12-14 hours of sleep per day, including naps. Discuss strategies to address any sleep disturbances",
        date: getFormattedDate(new Date(2022, 5, 8))
    }
];