import React, { useContext } from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const CreateCharacter = () => {
  const { logout } = useContext(AuthContext);
  // console.log('this is props', props);
  const image = { uri: 'https://reactjs.org/logo-og.png' };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{ flex: 2, justifyContent: 'center', backgroundColor: 'blue' }}
      >
        <ImageBackground source={image} />
        <Text>Create Character Screen</Text>
        <Button
          title="logout"
          style={{ margin: 10 }}
          onPress={() => {
            logout();
          }}
        ></Button>
      </View>
      <View
        style={{ flex: 2, justifyContent: 'center', backgroundColor: 'red' }}
      >
        <Text>Select your character</Text>
        <Image
          style={{ height: 100, width: 100 }}
          source={require('../../src/assets/splash.png')}
        />
      </View>
      <Button title="start" style={{ flex: 2 }}>
        Start
      </Button>
    </View>
  );
};

export default CreateCharacter;
