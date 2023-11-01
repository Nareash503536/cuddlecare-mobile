import React, { useContext } from 'react';
import { Box, Heading, VStack, Divider, Input, Icon, Button } from "native-base";
import { View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { AcceptRequestContext } from '../../../screens/CaregiverRequests/AcceptRequestScreen';

export default function SearchBar() {

    const { search, search2, setSearch } = useContext(AcceptRequestContext);

    return (
        <View className={"items-center"}>
            <VStack my="4" space={5} w="100%" maxW="300px" divider={<Box px="2">
                <Divider />
            </Box>}>
                <VStack w="100%" space={5} alignSelf="center">
                    <Heading fontSize="lg">Baby Requests</Heading>
                    <Input
                        placeholder="Search"
                        ref={search2}
                        value={search}
                        onChangeText={setSearch}
                        onChange={e => console.log(e.nativeEvent)}
                        onSearchButtonPress={() => search2.current.blur()}
                        variant="rounded"
                        width="100%"
                        borderRadius="10"
                        py="1"
                        px="2"
                        InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
                </VStack>
            </VStack>
        </View>
    )
}