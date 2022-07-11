import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import * as Font from 'expo-font';

const Character = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.main}>
          <View style={styles.top}>
            <View style={styles.container}>
              <Image
                source={{
                  uri: 'https://png.pngtree.com/png-vector/20201228/ourmid/pngtree-a-warrior-boy-clipart-png-image_2659449.jpg',
                }}
                style={{ width: 100, height: 100 }}
              />
            </View>
            <View style={styles.container}>
              <Text>{user.image}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    justifyContent: 'left',
  },
});

export default Character;
