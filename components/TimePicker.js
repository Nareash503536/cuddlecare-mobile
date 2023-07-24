// import DateTimePicker from '@react-native-community/datetimepicker';


// const TimePicker = () => {
//     return(
//       <View>
//          <DateTimePicker />
//       </View>
//     )
//   }


//   export default TimePicker;
  



























// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// const TimePickerComponent = () => {
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [isTimePickerVisible, setTimePickerVisible] = useState(false);

//   const handleTimeSelect = (time) => {
//     setSelectedTime(time);
//     setTimePickerVisible(false);
//   };

//   const showTimePicker = () => {
//     setTimePickerVisible(true);
//   };

//   const hideTimePicker = () => {
//     setTimePickerVisible(false);
//   };

//   return (
//     <View>
//       <Button title="Select Time" onPress={showTimePicker} />
//       <DateTimePickerModal
//         isVisible={isTimePickerVisible}
//         mode="time"
//         onConfirm={handleTimeSelect}
//         onCancel={hideTimePicker}
//       />
//       {selectedTime && (
//         <Button
//           title={`Selected Time: ${selectedTime.toLocaleTimeString()}`}
//           onPress={() => {}}
//         />
//       )}
//     </View>
//   );
// };

// export default TimePickerComponent;
