import React, {useContext, useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import rice from "../../../assets/images/Food/puree/rice.jpg";
import dhal from "../../../assets/images/Food/grains/dhal.jpg";
import sweet_potato from "../../../assets/images/Food/vegetables/sweet_potato.jpg";
import carrots from "../../../assets/images/Food/vegetables/carrots.jpg";
import pumpkin from "../../../assets/images/Food/vegetables/pumpkin.jpg";
import {VegetablesListSet} from "../Lists/VegetablesListSet";
import {PureeListSet} from "../Lists/PureeListSet";
import {Image} from "react-native";
import {PulsesListSet} from "../Lists/PulsesListSet";
import {FruitListSet} from "../Lists/FruitListSet";
import {themeColors} from "../../../theme";
import {PlayIcon} from "react-native-heroicons/solid";
import images from '../../../constants/images';

import {GlobalStyles} from "../../../constants/styles";
import ScreenHeader from "../../ScreenHeader";
import Food from "../../../assets/images/Food/dairy-products.png";
import {AnimalFoodListSet} from "../Lists/AnimalFoodListSet";
import {SnacksListSet} from "../Lists/SnacksListSet";
import {AuthContext} from "../../../Context/AuthContext";
export default function MealPlan(){
    const {updateKeys,baby} = useContext(AuthContext);

console.log(baby);
    useEffect(() => {
        async function fetchData() {
            const day = calculateAge(baby.dob);

            setBabyage(day);
            const data = await CreateMealPlan(450);

            setMealsArray(data);
        }

        fetchData();
    }, []);

    const[mealsArray,setMealsArray]=useState([])
    const [mealCount,setMealCount]=useState(0)
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [days,setDays]=useState(weekDays[new Date().getDay()]);
    const [babyage,setBabyage]=useState(0);
    console.log("week day",days);
    const rice_dhal=[
        {
            id: 20,
            name: "Mashed rice",
            category: "rice",
            image: rice

        },
        {
            id: 20,
            name: "Dhal",
            category: "dhal",
            image: dhal

        },
        {
            id: 21,
            name: "Dhal",
            category: "Special_vegetable",
            image: carrots

        }
    ]
    const Specialvegetable=[
        {
            id: 'X1',
            name: "Carrot",
            category: "SPvegetables",
            image: carrots

        },
        {
            id: 'X2',
            name: "Pumpkin",
            category: "SPvegetables",
            image: pumpkin

        },
        {
            id: 'X3',
            name: "Sweet Potato",
            category: "SPvegetables",
            image: sweet_potato

        }
    ]

    const calculateAge = (birthday) => {
        // birthday is a date
        var ageDiff = Date.now() - new Date(birthday).getTime();
        var ageDate =  Math.floor(ageDiff / (1000 * 60 * 60 * 24));

        if (ageDate > 182) {
            return ageDate - 182;
        }
        else {
            return 0;
        }

    }
    const assignNextMeals = (day) => {
        if(mealCount < 6){
            let count = mealCount + 1;
            console.log("meal count",mealCount,"day",day);
            let dayCount = weekDays.indexOf(days)+1;
            if(dayCount === 7){
                dayCount = 0;
            }
            setMealCount(mealCount + 1);

            setMealsArray(CreateMealPlan(day+count));
            setDays(weekDays[dayCount]);
            console.log("day count",dayCount,"day",day+count);
        }

    }
    const assignPreviousMeals  = (day) => {
        if(mealCount >0) {
            let count = mealCount - 1;
            let dayCount = weekDays.indexOf(days)-1;
            if(dayCount === -1){
                dayCount = 6;
            }
            setMealCount(mealCount - 1);
            setMealsArray(CreateMealPlan(day + count));
            setDays(weekDays[dayCount]);
            console.log(new Date().getDay()-count,dayCount,count,"count","actual day",day + count);
        }


    }
    function CreateMealPlan(Day){
        console.log(Day,"days in meal ")
        let mainmeal = []
        let extrameal = []
        let Notes = []
        let tempMeals = []

        let specialVeg =Specialvegetable[Math.floor(Math.random() * Specialvegetable.length)];

        let randomPulse =[]
        const Allpulses =PulsesListSet.filter(({category})=>category === "pulses")
        if (Allpulses.length>0){
            randomPulse = Allpulses[Math.floor(Math.random() * Allpulses.length)];
        }

        let randomAnimal =[]
        const AllAnimals =AnimalFoodListSet.filter(({category})=>category === "animalFood")
        if (AllAnimals.length>0){
            randomAnimal = AllAnimals[Math.floor(Math.random() * AllAnimals.length)];
        }

        let randomGreenleaves =[]
        const AllGreenleaves =VegetablesListSet.filter(({category})=>category === "greenLeafyVegetables")
        if (AllGreenleaves.length>0){
            randomGreenleaves = AllGreenleaves[Math.floor(Math.random() * AllGreenleaves.length)];
        }

        let randomVegetable =[]
        const AllVegetable =VegetablesListSet.filter(({category})=>category === "vegetables")
        if (AllVegetable.length>0){
            randomVegetable = AllVegetable[Math.floor(Math.random() * AllVegetable.length)];
        }

        let randomSnacks =[]
        const AllSnacks =SnacksListSet.filter(({category})=>category === "snacks");
        if (AllSnacks.length>0){
            randomSnacks = AllSnacks[Math.floor(Math.random() * AllSnacks.length)];
        }

        switch (true) {
            case Day === 1||Day === 2 || Day ===3 :

                mainmeal = [PureeListSet.find(({category})=>category === "rice"),{serving:"2-3 teaspoon"}]
                Notes = [{Notes:"Continue Breast feeding"}]
                tempMeals = [mainmeal,[],Notes]
                break;
            case Day === 4||Day === 5 :

                mainmeal = [PureeListSet.find(({category})=>category === "rice"),PulsesListSet.find(({name})=>name === "Dhal"),{serving:"3-4 teaspoon"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),{serving:"1 teaspoon"}]
                Notes = [{Notes:"Continue Breast feeding"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
            case Day === 6 :
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,{serving:"3-4 teaspoon"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),{serving:"1 teaspoon"}]
                Notes = [{Notes:"Continue Breast feeding"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
            case Day === 7||Day === 8||Day === 9 :

                mainmeal = [PureeListSet.find(({category})=>category === "rice"),PulsesListSet.find(({name})=>name === "Dhal"),randomAnimal,{serving:"3-4 teaspoon"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),{serving:"1 teaspoon"}]
                Notes = [{Notes:"Continue Breast feeding"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
            case Day >= 10 && Day <= 15 :
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,randomAnimal,specialVeg,{serving:"5-6 teaspoon"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),{serving:"1 teaspoon"}]
                Notes = [{Notes:"Continue Breast feeding"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
            case Day >= 16 && Day <= 30 :
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,randomAnimal,specialVeg,randomGreenleaves,{serving:"1/4 of a tea cup"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),{serving:"1-2 teaspoon"}]
                Notes = [{Notes:"Continue Breast feeding and give sips of water"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
                // 7 months
            case Day >= 31 && Day <= 38 :
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,randomAnimal,randomVegetable,randomGreenleaves,{serving:"1/2 of a tea cup"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),{serving:"2-3 teaspoons"}]
                Notes = [{Notes:"Continue Breast feeding and give sips of water"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
                // 7 months  1week
            case Day >= 39 && Day <= 46 :
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,randomAnimal,randomVegetable,randomGreenleaves,{serving:"1/2 of a tea cup"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),randomSnacks,{serving:"4 teaspoons"}]
                Notes = [{Notes:"Continue Breast feeding and give sips of water"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
                // 7 moths 2 week
            case Day >= 47 && Day <= 60 :
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,randomAnimal,randomVegetable,randomGreenleaves,{serving:"1/2 of a tea cup"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),randomSnacks,{serving:"Scraped fruit 4-5 teaspoons"}]
                Notes = [{Notes:"Continue Breast feeding and give sips of water"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
                // 8 months
            case Day >= 61 && Day <= 90 :
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,randomAnimal,randomVegetable,randomGreenleaves,{serving:"1/2 of a tea cup"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),randomSnacks,{serving:"1/4 cup of scraped fruit"}]
                Notes = [{Notes:"Continue Breast feeding and give sips of water"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
                // 9 months
            case Day >= 91 && Day <= 120 :
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,randomAnimal,randomVegetable,randomGreenleaves,{serving:"More than 1/2 of a tea cup"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),randomSnacks,{serving:"1/4 cup of scraped fruit"}]
                Notes = [{Notes:"Continue Breast feeding and give sips of water"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
                // 10-11moths
            case Day >= 121 && Day <= 180 :
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,randomAnimal,randomVegetable,randomGreenleaves,{serving:"More than 3/4 of a tea cup"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),randomSnacks,{serving:"1/4 cup of scraped fruit"}]
                Notes = [{Notes:"Continue Breast feeding and give sips of water"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
                // 1-2years
            case Day >= 181 && Day <= 546:
                mainmeal = [PureeListSet.find(({category})=>category === "rice"),randomPulse,randomAnimal,randomVegetable,randomVegetable,randomVegetable,randomGreenleaves,{serving:"More than 1 tea cup"}]
                extrameal = [FruitListSet.find(({category}) => category === "fruits"),randomSnacks,{serving:"1 medium sized fruit"}]
                Notes = [{Notes:"Continue Breast feeding or diary products"}]
                tempMeals = [mainmeal,extrameal,Notes]
                break;
        }
        return tempMeals;
    }


    const renderMainMeal = ({ item, index }) => {

        return(
            <View>

                {!item.serving&&
                    <>
                    {index === 0?
                    <View className ="flex-row">

                        <View  className ="flex-row  rounded-x mx-1 shadow-xl "
                               style={{ backgroundColor:"white" ,
                                   borderRadius: 10,
                                   shadowColor:"#000",
                                   width:220,

                               }}

                        >
                            {item.image&&
                                <Image
                                    source = {item.image}
                                    className ="w-1/2"
                                    style={{ height: 150,  borderRadius: 10}}

                                />
                            }
                            {item.name&&<View className ="p-4  text-l w-1/2 self-center"><Text  className ="font-bold text-base text-center">{item.name}</Text></View>}
                        </View>

                    </View>
                    :<>

                        {item.name&&<View className ="flex-row"  >
                            <Text  className ="self-center m-3 text-2xl">+</Text>
                                <View  className ="flex-row rounded-x mx-1 shadow-xl"
                                       style={{ backgroundColor:"white" ,
                                           borderRadius: 10,
                                           shadowColor:"#000",
                                           width:220,

                                }}

                                >
                                    {item.image&&
                                        <Image
                                            source = {item.image}
                                            className ="w-1/2"
                                            style={{ height: 150,  borderRadius: 10}}

                                        />
                                    }
                                    {item.name&&<View className ="p-4  text-l w-1/2 self-center"><Text  className ="font-bold text-base text-center">{item.name}</Text></View>}
                                </View>
                            </View>}

                        </>

                    }
                    </>
                }

            </View>

        )
    }
    return(
<View className ="flex-1 mt-8">
    <ScreenHeader screen={"Feeding"} screenName={"Meal planner"} BabyName={'Chelsea'} image={Food} />
    {mealsArray.length === 0 ?

        <View className={"justify-center align-middle mt-6"} style={{ flex: 1 }}>

            <Image
                source={require("../../../assets/images/Food/nomealplan.png")}
                resizeMode="contain"
                className={"w-60 h-60 mx-auto"}
                style={{ flex: 2 }}
            />
            <Text className={"text-center font-bold mt-5 text-xl"}>
                Continue Breast Feeding Until
            </Text>
            <Text className={"text-center font-bold  text-xl"}>
                Baby is 6 months old
            </Text>
            <Text
                className={"text-center  my-3 text-l"}
                style={{ flex: 1 ,color:"gray"}}
            >
                Meal plan will generate after 6 months
            </Text>
        </View >

        :<View  className ="flex-1 mt-8 ">

            <View className ="flex-row justify-center my-3">
                <PlayIcon size="35" color="#989C9D" style = {{ transform: [{ rotate: '180deg' }] }}  onPress={()=>assignPreviousMeals(babyage)}/>
                    <Text className ="text-2xl mx-8  text-center" style = {{ color: themeColors.colorDark }}> {days}</Text>
                <PlayIcon size="35" color="#989C9D" onPress={()=>assignNextMeals(babyage)}  />
            </View>

            <View className ="rounded-xl m-5 p-4 "
                  style={{
                      borderWidth:2,
                      borderColor:"'rgba(0,0,0,0.1)'",
                           backgroundColor: 'rgba(255,255,255,0.5)',
                           shadowColor:"#000"}}>

                {/*render main meals*/}
                {mealsArray[0]&&
                    <>
                        <View className ="p-2"  style={styles.title}>
                            <Text className ="text-xl font-extrabold text-center " style={{  color: themeColors.colorExtraDark, fontWeight:700}}>Main Meals</Text>
                        </View>
                        <FlatList data={mealsArray[0]}    renderItem={renderMainMeal}
                                  keyExtractor={(item, index) => index.toString()}
                                  horizontal={true} // Enable horizontal scrolling for meal names and images
                        />
                            {/*servings for the main meals*/}
                        {mealsArray[0]&&mealsArray[0].map((item, index) =>
                            item.serving&&
                                <View style={styles.quantity}>
                                    <Text className="self-center
                                                     font-bold
                                                     text-base"
                                          style={{  color: '#595B5BFF',}}>
                                        Serving: {item.serving}
                                    </Text>
                                </View>


                            )}
                    </>
                }

                {/*render snack*/}
                {mealsArray[1]&&mealsArray[1].length>0&&
                    <>
                        <View className ="p-2"  style={styles.title}>
                            <Text className ="text-xl text-center" style={{  color: themeColors.colorExtraDark, fontWeight:700}}>Snacks</Text>
                        </View>
                        <FlatList data={mealsArray[1]}    renderItem={renderMainMeal}
                                  keyExtractor={(item, index) => index.toString()}
                                  horizontal={true} // Enable horizontal scrolling for meal names and images
                                  showsHorizontalScrollIndicator={false}

                        />
                            {/*servings for the snacks*/}
                        {mealsArray[1].map((item, index) => {
                            if (item.serving) {
                                return (
                                <View style={styles.quantity}>
                                    <Text className="self-center
                                                     font-bold
                                                     text-base"
                                          style={{  color: '#595B5BFF',}}>

                                        Serving :  {item.serving}

                                    </Text>
                                </View>);
                            }
                            return null;
                        })}
                    </>
                }

                {/*render notes*/}
                {mealsArray[2]&& mealsArray[2].map((item, index) =>
                    {
                            if (item.Notes) {
                                return <Text key={index} className="self-center
                                                                    font-bold
                                                                    text-base"
                                                            style={{  color:themeColors.colorExtraDark,}}
                                    >
                                                    Notes: {item.Notes}
                                        </Text>;
                            }
                            return null;
                    })
                }

            </View>

        </View>
    }
</View>

    )
}
const styles = StyleSheet.create({

    quantity:{
        alignSelf: 'center',
        padding:15,
    },
    title:{
        // borderWidth:1,
        // border: themeColors.bgInput(1),
        marginBottom:10,
        alignSelf: 'center',
        width:150,
        borderRadius:5,
    }

})