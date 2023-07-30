
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    icon:{
        padding:5,
        paddingTop:7,
        borderRadius:50,
        color:'white',
        width:40,
        height:40,

    },
    cart:{
        backgroundColor:'purple'
    },
    train:{
        backgroundColor:"green"
    },
    pulse:{
        backgroundColor:"red"
    },
    paw:{
        backgroundColor:"pink"
    },
    pizza:{
        backgroundColor:"rgba(255, 165, 0, 1)"
    },
    bicycle:{
        backgroundColor:"blue"
    },
});
export const ExpenseIcons=({name})=>{

    return(
        <Icon style={{...styles.icon,...styles[name]}} name={name}  />

    );

};