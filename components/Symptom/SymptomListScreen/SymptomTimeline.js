import React from 'react';
import { SymptomData } from '../SymptomData';
import Timeline from 'react-native-timeline-flatlist';
import { View, Text } from 'react-native';

export const SymptomTimeline = () => {
    return (
        <View
            style={{
                backgroundColor: "#fff",
                shadowColor: '#000',
                elevation: 20,
                borderRadius: 10,
                marginHorizontal: 20,
            }}
        >
            <Text
                className={"text-center font-bold text-base my-5"}
            >
                Symptom Timeline
            </Text>
            <Timeline
                data={SymptomData}
                circleSize={40}
                circleColor='#477276'
                lineColor='#477276'
                timeContainerStyle={{ minWidth: 52 }}
                timeStyle={{
                    textAlign: 'center',
                    backgroundColor: '#91C9CE',
                    color: 'white',
                    padding: 5,
                    borderRadius: 13,
                    marginBottom: 10,
                    marginLeft: 10,
                    marginRight: 10,
                }}
                columnFormat='two-column'
                descriptionStyle={{
                    color: 'gray',
                    fontSize: 12,
                }}
                titleStyle={{
                    color: '#fff',
                    fontWeight: 'bold',
                    bottom: 5,
                    fontSize: 15,
                }}
                detailContainerStyle={{
                    marginBottom: 20,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: '#BADEE3',
                    borderRadius: 10,
                    marginHorizontal: 10
                }}
                options={{
                    style: { paddingTop: 5 }
                }}
                separator={false}
                isUsingFlatlist={true}
                innerCircle={'icon'}
            />
        </View>
    )
}