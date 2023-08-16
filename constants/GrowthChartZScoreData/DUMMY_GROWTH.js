import {getFormattedDate} from "../../util/date";

export const DUMMY_GROWTH =[
    {
        id: 'e1',
        weight:3.5,
        height: 50.6,
        headCircumference: 34.5,
        description: "Midwife emphasized the importance of a balanced diet at this stage. Baby is transitioning to solid foods well. Continue offering a variety of foods, including fruits, vegetables, grains, and proteins",
        date: getFormattedDate(new Date(2022, 9, 27)),
    },
    {
        id: 'e2',
        weight:4.6,
        height: 55.2,
        headCircumference: 35.8 ,
        description: "Mentioned that baba's speech development is on track. Encourage his language skills by talking to him, reading books together, and naming objects around him",
        date: getFormattedDate(new Date(2022, 10, 28)),
    },
    {
        id: 'e3',
        weight:5.6,
        height: 63.5,
        headCircumference: 36.4,
        description: "Emphasized the significance of active playtime. Baby should be engaging in physical activities to enhance his motor skills and overall physical development",
        date: getFormattedDate(new Date(2022, 11, 29)),
    },
    {
        id: 'e4',
        weight:6.4,
        height: 64.2,
        headCircumference: 41.5,
        description: "Recommended maintaining a consistent sleep schedule. Ensure baby is getting around 12-14 hours of sleep per day, including naps. Discuss strategies to address any sleep disturbances",
        date: getFormattedDate(new Date(2022, 12, 27))
    },
    {
        id: 'e5',
        weight:6.6,
        height: 66.2,
        headCircumference: 42.2 ,
        description: "Recommended maintaining a consistent sleep schedule. Ensure baby is getting around 12-14 hours of sleep per day, including naps. Discuss strategies to address any sleep disturbances",
        date: getFormattedDate(new Date(2022, 1, 24))
    },
    {
        id: 'e6',
        weight:7.9,
        height: 68,
        headCircumference: 43.6,
        description: "Recommended maintaining a consistent sleep schedule. Ensure baby is getting around 12-14 hours of sleep per day, including naps. Discuss strategies to address any sleep disturbances",
        date: getFormattedDate(new Date(2023, 2, 27))
    },
    {
        id: 'e7',
        weight:8.8,
        height: 69.5,
        headCircumference: 44.7,
        description: "Recommended maintaining a consistent sleep schedule. Ensure baby is getting around 12-14 hours of sleep per day, including naps. Discuss strategies to address any sleep disturbances",
        date: getFormattedDate(new Date(2023, 3, 26))
    },
    {
        id: 'e8',
        weight:10.3,
        height: 71,
        headCircumference: 46.8,
        description: "Recommended maintaining a consistent sleep schedule. Ensure baby is getting around 12-14 hours of sleep per day, including naps. Discuss strategies to address any sleep disturbances",
        date: getFormattedDate(new Date(2023, 4, 29))
    },
    {
        id: 'e9',
        weight:10.7,
        height: 72.1,
        headCircumference: 47.2,
        description: "Recommended maintaining a consistent sleep schedule. Ensure baby is getting around 12-14 hours of sleep per day, including naps. Discuss strategies to address any sleep disturbances",
        date: getFormattedDate(new Date(2023, 5, 25))
    },
    {
        id: 'e10',
        weight:11.4,
        height: 74.2,
        headCircumference: 48.4,
        description: "Recommended maintaining a consistent sleep schedule. Ensure baby is getting around 12-14 hours of sleep per day, including naps. Discuss strategies to address any sleep disturbances",
        date: getFormattedDate(new Date(2023, 6, 24))
    }
];

export const DUMMY_Milestones =[
    {id:'1',"date": getFormattedDate(new Date(2023, 6, 24)), "description": "Sometimes Calms down when spoken", "milestone": "Calms down when spoken to or picked up"},
    {id:'2',"date": getFormattedDate(new Date(2023, 5, 22)), "description": "Baby does this properly", "milestone": "Looks at your face"},
    {id:'3',"date": getFormattedDate(new Date(2023, 4, 23)), "description": "Sometimes Baby cries", "milestone": "Reacts to loud sounds"},
    {id:'4',"date": getFormattedDate(new Date(2023, 3, 28)), "description": "Baby smiled first with his papa", "milestone": "Smiles when you talk to or smile at her"},
];