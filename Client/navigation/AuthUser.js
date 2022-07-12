import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import MainTabScreen from '../components/MainTabScreen';
import SingleRoutine from '../components/SingleRoutine';
import SessionExercise from '../components/SessionExercise';
import UserHistory from '../components/UserHistory';
import AllRoutines from '../components/AllRoutines';
import ExerciseHistory from '../components/ExerciseHistory';

const AuthUser = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => <MainTabScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SingleRoutine">
        {(props) => <SingleRoutine {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SessionExercise">
        {(props) => <SessionExercise {...props} />}
      </Stack.Screen>
      <Stack.Screen name="UserHistory">
        {(props) => <UserHistory {...props} />}
      </Stack.Screen>
      <Stack.Screen name="AllRoutines">
        {(props) => <AllRoutines {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ExerciseHistory">
        {(props) => <ExerciseHistory {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthUser;
