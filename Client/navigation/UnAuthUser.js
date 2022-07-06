import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
const Stack = createNativeStackNavigator();

function UnAuthUser() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {(props) => <SignUp {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </ApplicationProvider>
  );
}

export default UnAuthUser;
