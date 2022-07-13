import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Bar } from 'react-native-progress';
import { AuthContext } from '../context/AuthContext';

const CurrentOpponent = ({ navigation }) => {
  const { user, currentOpponent } = useContext(AuthContext);

  const minGold = Math.ceil(user.currentLevel * 0.95);
  const maxGold = Math.ceil(user.currentLevel * 1.05);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Current Opponent</Text>
          </View>
          <View style={styles.opponentInfo}>
            <Text style={styles.text}>{currentOpponent.name}</Text>
            <Text style={styles.text}>{`Level ${currentOpponent.level}`}</Text>
            <View style={styles.image}>
              <Image
                source={{
                  uri: 'https://www.svgheart.com/wp-content/uploads/2021/11/one-eye-monster-cyclops-halloween-free-svg-file-SvgHeart.Com.png',
                }}
                style={{ width: 300, height: 300 }}
              />
            </View>
            <Bar
              progress={
                currentOpponent.currentHealth / currentOpponent.totalHealth
              }
              color={'red'}
              width={150}
              height={16}
            />
            <Text
              style={styles.text}
            >{`HP: ${currentOpponent.currentHealth} / ${currentOpponent.totalHealth}`}</Text>
          </View>
          <View style={styles.rewards}>
            <Text style={styles.text}>Rewards</Text>
            <Text style={styles.text}>
              {minGold === maxGold
                ? `${minGold} Gold`
                : `${minGold} - ${maxGold} Gold`}
            </Text>
            <Text style={styles.text}>New Item (25% Chance)</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },

  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 35,
    opacity: 0.8,
    borderRadius: 15,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrentOpponent;
