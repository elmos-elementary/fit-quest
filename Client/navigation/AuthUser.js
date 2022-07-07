import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import UserHome from '../components/UserHome';
import StartWork from '../components/StartWorkout';

const AuthUser = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserHome">
        {(props) => <UserHome {...props} />}
      </Stack.Screen>
      <Stack.Screen name="StartWorkout">
        {(props) => <StartWorkout {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthUser;
