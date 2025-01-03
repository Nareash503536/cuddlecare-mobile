import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import {themeColors} from "../theme";
import {View} from "react-native";

const Search_Bar = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            onSearch(searchQuery);
        }
    };

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                mode={'bar'}
                value={searchQuery}
                onSubmitEditing={handleSearch}
                style={{
                    backgroundColor: "white",
                    width:'80%',
                    alignSelf:'center',
                    height:50,
                    borderRadius:30,
                    margin:10
                }}
                iconColor={"grey"}
                // iconColor={themeColors.bgWhite(1)}
            />
        </View>

    );
};

export default Search_Bar