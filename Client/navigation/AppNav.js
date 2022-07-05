import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UnAuthUser from './UnAuthUser';
import AuthUser from './AuthUser';
import { AuthContext } from '../context/AuthContext';

const AppNav = () => {
  console.log('in app nav: ', useContext(AuthContext));
  const { isLoading, userToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {userToken !== null ? <AuthUser /> : <UnAuthUser />}
    </NavigationContainer>
  );
};

export default AppNav;
