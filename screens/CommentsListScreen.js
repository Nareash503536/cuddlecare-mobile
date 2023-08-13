import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export function CommentsListScreen({route}) {
    const { comments } = route.params;
    return (
        <View className={"mx-8 mt-20"}>
            <FlatList
                data={comments}
                keyExtractor={(item,index)=> index.toString() }
                renderItem={({ item }) =>
                    ( <View style={{backgroundColor:"#94CCD2"}}>
                           <Text className={"px-4 py-3"}>{item}</Text>
                            <Text>gdascfyqwdfywt</Text>
                    </View>
                    )  }
            />
        </View>
    );
}

