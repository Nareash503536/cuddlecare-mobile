import React, { useContext, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { VaccineContext } from '../../screens/Vaccination/VaccinationDashboard';
import { COLORS } from '../../constants/theme';
import VaccinationContainer from './VaccinationContainer';
import images from '../../constants/images';

export default function GivenVaccines() {
    const { vaccinationsUpcoming, loading } = useContext(VaccineContext);

    return (
        loading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <LottieView source={animation.Spinner} autoPlay loop /> */}
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View> :
            vaccinationsUpcoming.length === 0 ?
                (
                    <View className={"m-auto items-center"}>
                        <Image
                            source={images.NoBabiesWarning}
                            className={"w-60 h-60 rounded-full border"}
                        />
                        <Text className={"text-2xl font-extrabold"} style={{ color: COLORS.fontColor1 }}>
                            No vaccinations!
                        </Text>
                        <Text className="text-center"  style={{ color: "grey" }}>Sorry... No vaccinations to be given to the baby</Text>
                    </View>) :
                (
                    <View
                        className={"rounded-2xl m-3"}
                        style={{
                            backgroundColor: "#f7fdfb",
                            borderColor: "#e0f8ee",
                            borderStyle: "solid",
                            borderWidth: 3,
                        }}
                    >

                        <FlatList
                            data={vaccinationsUpcoming}
                            renderItem={({ item }) => {
                                return (
                                    <VaccinationContainer
                                        name={item.name}
                                        category={item.category}
                                        months={item.months}
                                        givenStatus={false}
                                        listType={"upcoming"}
                                    />
                                )
                            }}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View className={"border border-t-0 w-4/5 mx-auto my-3 opacity-5 items-center"}></View>
                                )
                            }}
                            keyExtractor={(item) => item.vaccinationID}
                        />
                    </View>
                )
    )
}