import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ios = Platform.OS==='android';

const RemindersButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('RemindersList');
  };

  return (
    <Button title="Reminders" onPress={handlePress} />
  );
};

export default RemindersButton;
