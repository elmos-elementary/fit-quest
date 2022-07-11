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
  let currentLevelString = user.currentLevel.toString();
  console.log(getSession);
  console.log(levelExp);
  console.log(levelExp[currentLevelString]);
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
              <Bar
                progress={user.currentLevelExp / levelExp[currentLevelString]}
              />
              <Text>
                {user.currentLevelExp} / {levelExp[currentLevelString]} XP
              </Text>
            </View>
          </View>
          <View style={styles.allSkillsContainer}>
            <View style={styles.skillsContainer}>
              <Text>Chest</Text>
              <Text>Level</Text>
              <Bar progress={8 / 10} width={200} height={16} />
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
    flexDirection: 'column',
  },
  top: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
    margin: 10,
    padding: 10,
  },
  topTextBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexBasis: 250,
    paddingLeft: 20,
  },
  allSkillsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
    margin: 10,
    padding: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Character;
