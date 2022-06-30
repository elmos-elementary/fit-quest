import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//components
import HomeScreen from './components/HomeScreen';
import Login from './components/Login';
import SignUp from './components/SignUp';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
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
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;
