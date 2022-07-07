import { Layout, Text, Button } from '@ui-kitten/components';
import React from 'react';

const HomeScreen = ({ navigation }) => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category="h1">Fit Quest</Text>
    <Text category="s1">Time to gamify your body</Text>
    <Button
      style={{ margin: 10 }}
      onPress={() => {
        navigation.navigate('SignUp');
      }}
    >
      Sign Up
    </Button>
    <Button
      style={{ margin: 10 }}
      onPress={() => {
        navigation.navigate('Login');
      }}
    >
      Log In
    </Button>
  </Layout>
);

export default HomeScreen;
