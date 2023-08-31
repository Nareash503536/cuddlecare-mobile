export default function  NutrientsList(){

    let Age = 10;

    //Amount of each nutrient for a serving in g
    let rice = 85.00
    let cereals = 45.00
    let vegetables = 45.00
    let fruits = 50.00
    let meat_fish = 30.00
    let egg = 1
    let pulses = 30.00
    let milk = 85.00
    let greenLeafyVegetables = 85.00
    let snacks = 25.00
    let yoghurt_curd = 170.00
    let cheese = 30.00
    let sprats = 80.00
    let dhal = 45.00
    switch (Age) {
        case 7<Age<10:
            rice = rice*2.5
            cereals = cereals*2.5
            yoghurt_curd = yoghurt_curd*0.75
            milk = milk*0.75
            cheese = cheese*0.75
            snacks = 0.00
            break;
        case 10<Age<13:
            rice = rice*3.5
            cereals = cereals*3.5
            sprats =sprats*1.5
            dhal = dhal*1.5
            vegetables = vegetables*1.5
            fruits = fruits*1.5
            meat_fish =meat_fish*1.5
            egg = egg*1.5
            snacks = 0.00
            break;
        case 13<Age<24:
            rice = rice*3.5
            cereals = cereals*3.5
            sprats =sprats*1.5
            dhal = dhal*1.5
            vegetables = vegetables*1.5
            fruits = fruits*1.5
            meat_fish =meat_fish*1.5
            egg = egg*1.5
            pulses = pulses*1.5
            break;
        case Age>24:
            rice = rice*4
            cereals = cereals*4
            sprats =sprats*2
            dhal = dhal*1.5
            vegetables = vegetables*1.5
            fruits = fruits*1.5
            meat_fish =meat_fish*2
            egg = egg*2
            pulses = pulses*1.5
            yoghurt_curd = yoghurt_curd*1.5
            milk = milk*1.5
            cheese = cheese*1.5
            break;
    }
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