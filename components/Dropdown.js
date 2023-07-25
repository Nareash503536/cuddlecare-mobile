import React, { useState,View } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'

const Dropdown = ({enabled , data}) => {
    console.log({...enabled})

  const [selected, setSelected] = React.useState("");

  return(
    
        <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
    
   
  )

};


export default Dropdown;