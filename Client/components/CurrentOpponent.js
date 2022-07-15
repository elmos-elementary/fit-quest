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
        <View style={styles.pageContainer}>
          <ScrollView>
            <Text style={styles.text}>Current Opponent</Text>

            <View style={styles.image}>
              <Image
                source={{
                  uri: 'https://www.svgheart.com/wp-content/uploads/2021/11/one-eye-monster-cyclops-halloween-free-svg-file-SvgHeart.Com.png',
                }}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{currentOpponent.name}</Text>
              <Text
                style={styles.text1}
              >{`Level ${currentOpponent.level}`}</Text>
              <Bar
                progress={
                  currentOpponent.currentHealth / currentOpponent.totalHealth
                }
                color={'red'}
                height={15}
              />
              <Text>{`HP: ${currentOpponent.currentHealth} / ${currentOpponent.totalHealth}`}</Text>
            </View>

            <View style={styles.rewards}>
              <Text style={styles.text1}>Rewards</Text>
              <Text>
                {minGold === maxGold
                  ? `${minGold} Gold`
                  : `${minGold} - ${maxGold} Gold`}
              </Text>
              <Text>New Item (25% Chance)</Text>
            </View>
          </ScrollView>
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
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 60,
    borderRadius: 15,
    margin: 20,
    padding: 10,
    opacity: 0.9,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },

  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  image: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 10,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  rewards: {
    backgroundColor: '#7E7E7E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 40,
    padding: 20,
  },
});

export default CurrentOpponent;
