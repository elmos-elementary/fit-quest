import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import PasswordRecovery from '../components/PasswordRecovery';
import MainTabScreen from '../components/MainTabScreen';
import SingleRoutine from '../components/SingleExercise';

const AuthUser = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => <MainTabScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SingleRoutine">
        {(props) => <SingleRoutine {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthUser;
