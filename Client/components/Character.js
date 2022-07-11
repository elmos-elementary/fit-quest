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
import { Bar } from 'react-native-progress';
import * as Font from 'expo-font';

const Character = ({ navigation }) => {
  const { user, getSession } = useContext(AuthContext);

  // User Level Experience Table
  let levelCounter = 10;
  const levelExp = {};
  for (let i = 1; i <= 100; i++) {
    if (i === 1) {
      levelExp[i] = 0;
    } else {
      levelExp[i] = levelCounter;
      levelCounter += 11;
    }
  }

  // Skill Level Experience Table
  let skillCounter = 10;
  const skillLevelExp = {};
  for (let i = 1; i <= 100; i++) {
    if (i === 1) {
      skillLevelExp[i] = 0;
    } else {
      skillLevelExp[i] = skillCounter;
      skillCounter += 11;
    }
  }

  console.log(useContext(AuthContext));
  console.log(getSession);
  // console.log(user);
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
            <View style={styles.topTextBox}>
              <Text>{user.name}</Text>
              <Text>Level: {user.currentLevel}</Text>
              <Bar progress={user.currentLevelExp / 10} />
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
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
  },
  topTextBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexBasis: 300,
    paddingLeft: 20,
  },
});

export default Character;
