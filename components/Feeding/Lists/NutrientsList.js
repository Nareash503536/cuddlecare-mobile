import {useState} from "react";

export default function  NutrientsList(){

    const [Age, setAge] = useState(10);

    //Amount of each nutrient for a serving in g
    // let rice = 85.00
    // let cereals = 45.00
    // let vegetables = 45.00
    // let fruits = 50.00
    // let meat_fish = 30.00
    // let egg = 1
    // let pulses = 30.00
    // let milk = 85.00
    // let greenLeafyVegetables = 85.00
    // let snacks = 25.00
    // let yoghurt_curd = 170.00
    // let cheese = 30.00
    // let sprats = 80.00
    // let dhal = 45.00
    const [rice, setRice] = useState(85.00);
    const [cereals, setCereals] = useState(45.00);
    const [vegetables, setVegetables] = useState(45.00);
    const [fruits, setFruits] = useState(50.00);
    const [meat_fish, setMeat_fish] = useState(30.00);
    const [egg, setEgg] = useState(1);
    const [pulses, setPulses] = useState(30.00);
    const [milk, setMilk] = useState(85.00);
    const [greenLeafyVegetables, setGreenLeafyVegetables] = useState(85.00);
    const [snacks, setSnacks] = useState(25.00);
    const [yoghurt_curd, setYoghurt_curd] = useState(170.00);
    const [cheese, setCheese] = useState(30.00);
    const [sprats, setSprats] = useState(80.00);
    const [dhal, setDhal] = useState(45.00);
    switch (true) {
        case Age > 7 && Age < 10:
            setRice(rice * 2.5);
            setCereals(cereals * 2.5);
            setYoghurt_curd(yoghurt_curd * 0.75);
            setMilk(milk * 0.75);
            setCheese(cheese * 0.75);
            setSnacks(0.00);
            break;
        case Age >= 10 && Age < 13:
            setRice(rice * 3.5);
            setCereals(cereals * 3.5);
            setSprats(sprats * 1.5);
            setDhal(dhal * 1.5);
            setVegetables(vegetables * 1.5);
            setFruits(fruits * 1.5);
            setMeat_fish(meat_fish * 1.5);
            setEgg(egg * 1.5);
            setSnacks(0.00);
            break;
        case Age >= 13 && Age < 24:
            setRice(rice * 3.5);
            setCereals(cereals * 3.5);
            setSprats(sprats * 1.5);
            setDhal(dhal * 1.5);
            setVegetables(vegetables * 1.5);
            setFruits(fruits * 1.5);
            setMeat_fish(meat_fish * 1.5);
            setEgg(egg * 1.5);
            setPulses(pulses * 1.5);
            break;
        case Age >= 24:
            setRice(rice * 4);
            setCereals(cereals * 4);
            setSprats(sprats * 2);
            setDhal(dhal * 1.5);
            setVegetables(vegetables * 1.5);
            setFruits(fruits * 1.5);
            setMeat_fish(meat_fish * 2);
            setEgg(egg * 2);
            setPulses(pulses * 1.5);
            setYoghurt_curd(yoghurt_curd * 1.5);
            setMilk(milk * 1.5);
            setCheese(cheese * 1.5);
            break;
    }
console.log("cerals",cereals)
    return [
        { foodItem: 'rice', value: rice },
        { foodItem: 'cereals', value: cereals },
        { foodItem: 'vegetables', value: vegetables },
        { foodItem: 'fruits', value: fruits },
        { foodItem: 'egg', value: egg },
        { foodItem: 'pulses', value: pulses },
        { foodItem: 'yoghurt_curd', value: yoghurt_curd },
        { foodItem: 'milk', value: milk },
        { foodItem: 'dhal', value: dhal },

        { foodItem: 'greenLeafyVegetables', value: greenLeafyVegetables },
        { foodItem: 'meat_fish', value: meat_fish },

        { foodItem: 'cheese', value: cheese },
        { foodItem: 'snacks', value: snacks },
        { foodItem: 'sprats', value: sprats}


    ];

}