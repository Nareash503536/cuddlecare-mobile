import React, { useState,View } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'

const Dropdown = (value) => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Daily'},
      {key:'2', value:'Once a week'},
      {key:'3', value:'Once a month'},
      {key:'4', value:'Once a year'}
  ]

  return(
    
        <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
    
   
  )

};


export default Dropdown;