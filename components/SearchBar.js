import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import {themeColors} from "../theme";
import {GlobalStyles} from "../constants/styles";
import {View} from "react-native";
import center from "native-base/src/theme/components/center";

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
                style={{backgroundColor:themeColors.colornormal,width:'80%',alignSelf:'center',borderRadius:30,marginTop:20}}
                // iconColor={GlobalStyles.colors.primary50}
                iconColor={themeColors.bgWhite(1)}
            />
        </View>

    );
};

export default Search_Bar