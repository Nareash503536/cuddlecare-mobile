import  React from 'react';
import { View,Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
// import Dropdown from './Dropdown';

const RadioBtn = () => {
  const [selected, setSelected] = React.useState('once');


  return (
    <View className={"flex-row space-x-10"} >
        <View>
        <RadioButton
        value="once"
        label = "once"
        status={ selected === 'once' ? 'checked' : 'unchecked' }
        onPress={() => setSelected('once')}/>

          <Text>Once</Text>


        </View>

        <View>
        <RadioButton
        value="repeat"
        status={ selected === 'repeat' ? 'checked' : 'unchecked' }
        onPress={() => setSelected('repeat')}
      />
      <Text>Repeat</Text>
        </View>
     
      
      {/* <Dropdown enabled={checked === 'repeat'} /> */}
       
    </View>
  
  );
};

export default RadioBtn