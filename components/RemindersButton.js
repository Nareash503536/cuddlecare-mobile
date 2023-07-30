import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Button from "./UI/Button";

const RemindersButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('RemindersList');
  };

  return (
    <Button
        title=""
        className={'mx-20'}
        onPress={handlePress}>Reminders</Button>
  );
};

export default RemindersButton;
