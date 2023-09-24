import NutrientsCalculator from "./NutrientsCalculator";
import SolidFoodsHeader from "./SolidFoodsHeader";
import {store} from "../../../store/store";


export default function SolidFoodNav(){
    return(

        <NutrientsCalculator>
            <SolidFoodsHeader/>
        </NutrientsCalculator>

    )
}