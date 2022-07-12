import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserHome from './UserHome';
import AllRoutines from './AllRoutines';
import SingleRoutine from './SingleRoutine';
import UserHistory from './UserHistory';
// import SessionExercise from './SessionExercise';
import { AuthContext } from '../context/AuthContext';

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
          {user.currentSession ? (
            <Tab.Screen
              name="SingleRoutine"
              component={SingleRoutine}
              options={{
                tabBarLabel: 'Current Session',
                tabBarColor: '#1f65ff',

                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
              }}
            />
          ) : (
            <Tab.Screen
              name="AllRoutines"
              component={AllRoutines}
              options={{
                tabBarLabel: 'All Routines',
                tabBarColor: '#1f65ff',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
              }}
            />
          )}

          <Tab.Screen
            name="UserHistory"
            component={UserHistory}
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

export default MainTabScreen;
