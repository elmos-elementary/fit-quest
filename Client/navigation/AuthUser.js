import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const AuthUser = () => {
  const { logout } = useContext(AuthContext);
  // console.log('this is props', props);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello</Text>
      <Button
        title="logout"
        style={{ margin: 10 }}
        onPress={() => {
          logout();
        }}
      ></Button>
    </View>
  );
};

export default AuthUser;
