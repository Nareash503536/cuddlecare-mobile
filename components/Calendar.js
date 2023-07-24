import { View } from 'react-native';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';



const Calendars = () => {
  return(
    <View>
       <Calendar />
    </View>
  )
}

export default Calendars;
























// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';

// const Calendar = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateSelect = (date) => {
//     setSelectedDate(date.toString());
//   };

//   return (
//     <View>
//       <CalendarPicker onDateChange={handleDateSelect} />
//       {selectedDate && (
//         <Button
//           title={`Selected Date: ${selectedDate}`}
//           onPress={() => {}}
//         />
//       )}
//     </View>
//   );
// };

// export default Calendar;
