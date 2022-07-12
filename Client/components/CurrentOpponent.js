import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { Bar } from 'react-native-progress';
import { AuthContext } from '../context/AuthContext'

const CurrentOpponent = ({ navigation }) => {
  const { user, currentOpponent } = useContext(AuthContext);

  const minGold = Math.ceil(user.currentLevel * 0.95)
  const maxGold = Math.ceil(user.currentLevel * 1.05)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Current Opponent</Text>
          </View>
          <View style={styles.opponentInfo}>
            <Text style={styles.text}>{currentOpponent.name}</Text>
            <Text style={styles.text}>{`Level ${currentOpponent.level}`}</Text>
            <Bar
                progress={
                  currentOpponent.currentHealth /
                  currentOpponent.totalHealth
                }
                color={'red'}
                width={150}
                height={16}
              />
          </View>
          <View style={styles.rewards}>
            <Text style={styles.text}>Rewards</Text>
            <Text style={styles.text}>{(minGold === maxGold) ? `${minGold} Gold` : `${minGold} - ${maxGold} Gold`}</Text>
            <Text style={styles.text}>New Item (25% Chance)</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({})

export default CurrentOpponent
