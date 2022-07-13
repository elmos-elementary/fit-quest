import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserHome from './UserHome';
import AllRoutines from './AllRoutines';
import SingleRoutine from './SingleRoutine';
import UserHistory from './UserHistory';
import CurrentOpponent from './CurrentOpponent';
import UserSingleSession from './UserSingleSession';
import SessionExercise from './SessionExercise';
import Character from './Character';
import { AuthContext } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HistoryStack = createNativeStackNavigator();
const hasSessionStack = createNativeStackNavigator();
const noSessionStack = createNativeStackNavigator();
const homeStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainTabScreen() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <Tab.Navigator
          initialRouteName="UserHome"
          activeColor="#e91e63"
          barStyle={{ backgroundColor: 'white' }}
        >
          <Tab.Screen
            name="UserHome"
            component={UserHome}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: '#009387',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="userNoSessionStack"
            component={UserNoSessionStack}
            options={{
              tabBarLabel: 'Current Session',
              tabBarColor: '#1f65ff',

              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="dumbbell"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="HistoryUserStack"
            component={HistoryUserStack}
            options={{
              tabBarLabel: 'User History',
              tabBarColor: '#1f65ff',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="history"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Character"
            component={Character}
            options={{
              tabBarLabel: 'Character',
              tabBarColor: '#1f65ff',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="controller-classic"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CurrentOpponent"
            component={CurrentOpponent}
            options={{
              tabBarLabel: 'Opponent',
              tabBarColor: '#1f65ff',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="arrow-projectile-multiple"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          initialRouteName="UserHome"
          activeColor="#e91e63"
          barStyle={{ backgroundColor: 'white' }}
        >
          <Tab.Screen
            name="UserHome"
            component={UserHome}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: '#009387',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
}

const HistoryUserStack = ({ navigation }) => {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="UserHistory" component={UserHistory} />
      <HistoryStack.Screen
        name="UserSingleSession"
        component={UserSingleSession}
      />
    </HistoryStack.Navigator>
  );
};

const UserNoSessionStack = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  return (
    <noSessionStack.Navigator screenOptions={{ headerShown: false }}>
      {user.currentSession ? (
        <noSessionStack.Screen name="SingleRoutine" component={SingleRoutine} />
      ) : (
        <noSessionStack.Screen name="AllRoutines" component={AllRoutines} />
      )}

      <noSessionStack.Screen
        name="SessionExercise"
        component={SessionExercise}
      />
    </noSessionStack.Navigator>
  );
};

export default MainTabScreen;
