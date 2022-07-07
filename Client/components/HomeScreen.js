import { Layout, Text, Button } from '@ui-kitten/components';
import React from 'react';
import { ImageBackground } from 'react-native';

const image = {
  uri: 'https://imgur.com/rJ1GVWj.jpg',
};

const HomeScreen = ({ navigation }) => (
  <Layout style={{ flex: 1, justifyContent: 'center' }}>
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
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
    </ImageBackground>
  </Layout>
);

export default HomeScreen;
