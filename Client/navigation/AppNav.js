import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UnAuthUser from './UnAuthUser';
import AuthUser from './AuthUser';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AuthUser /> : <UnAuthUser />}
    </NavigationContainer>
  );
};

export default AppNav;
