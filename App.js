// import React from 'react';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { View, Text } from 'react-native';
// import LandingPage from './src/LandingPage'

// const HomeScreen = () => (
//   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text category="h1">HOME</Text>
//     <Text>Sign Up</Text>
//     <Text>Log In</Text>
//   </Layout>
// );

const HomeScreen = () => {
  return(
    <View>
      <Text>Hello World!</Text>;
    </View>
  )
};

export default () => (
  // <ApplicationProvider {...eva} theme={eva.light}>
  <HomeScreen />
  // </ApplicationProvider>
);
