import NutrientsList from "../Lists/NutrientsList";

export  default function NutrientsCalculator(){
         let TodayCart = [
             {
                 rice : 85.00,
                 cereals : 45.00

             },
             {
                 vegetables : 45.00,
                 fruits : 50.00
             }
         ];

         let FoodHealthTipList = []
         let healthTip = []

        TodayCart.forEach((item) => {
            Object.keys(item).forEach((key)=>{
                let NeededNutrient= NutrientsList.find(nutrient => nutrient.name === key).value;
                    if(NeededNutrient){
                        FoodHealthTipList.push({
                            name: key,
                            difference: NeededNutrient - item[key],
                        });
                    }

            });
        });
         const generateHealthTip = (FoodHealthTipList) => {

             FoodHealthTipList.forEach((item)=>{
                 if (item.difference>0){
                   healthTip.push(`You need to add ${item.difference}g of ${item.name} to your meal today`);
                 }
                 if (item.difference<0){
                     healthTip.push(`You need to added ${item.difference}g more ${item.name} to your meal today`);
                 }
             })

        }
    }
//Add actual items and weights to the Today cart
