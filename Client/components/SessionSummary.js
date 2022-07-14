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

const SessionSummary = ({ navigation }) => {
  const { summary } = useContext(AuthContext);

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
            <Text style={styles.text}>Session Summary</Text>

            <View style={styles.textContainer}>
            {summary.damageDealt ? <Text style={styles.text1}>{`Damage Dealt: ${summary.damageDealt}`}</Text> : <></>}
            {summary.opponentsDefeated ? <Text style={styles.text1}>{`You have defeated ${summary.opponentsDefeated}!`}</Text> : <></>}
            {summary.coinsGained ? <Text style={styles.text1}>{`Coins Gained: ${summary.coinsGained}`}</Text> : <></>}
            {summary.newItem ? <Text style={styles.text1}>{`New Items Gained: ${summary.newItem.join(', ')}`}</Text> : <></>}
              {summary.expGained ? <Text style={styles.text1}>{`Exp Gained: ${summary.expGained}`}</Text> : <></>}
              {summary.characterLevelGained ? <Text style={styles.text1}>{`Levels Gained: ${summary.characterLevelGained}`}</Text> : <></>}
              {summary.newLevel ? <Text style={styles.text1}>{`New Level: ${summary.newLevel}`}</Text> : <></>}
              {summary.chestExpGained ? <Text style={styles.text1}>{`Chest Exp Gained: ${summary.chestExpGained}`}</Text> : <></>}
              {summary.chestLevelGained ? <Text style={styles.text1}>{`Chest Level Gained: ${summary.chestLevelGained}`}</Text> : <></>}
              {summary.backExpGained ? <Text style={styles.text1}>{`Back Exp Gained: ${summary.backExpGained}`}</Text> : <></>}
              {summary.backLevelGained ? <Text style={styles.text1}>{`Back Level Gained: ${summary.backLevelGained}`}</Text> : <></>}
              {summary.armsExpGained ? <Text style={styles.text1}>{`Arms Exp Gained: ${summary.armsExpGained}`}</Text> : <></>}
              {summary.armsLevelGained ? <Text style={styles.text1}>{`Arms Level Gained: ${summary.armsLevelGained}`}</Text> : <></>}
              {summary.abdominalsExpGained ? <Text style={styles.text1}>{`Abdominals Exp Gained: ${summary.AbdominalsExpGained}`}</Text> : <></>}
              {summary.abdominalsLevelGained ? <Text style={styles.text1}>{`Abdominals Level Gained: ${summary.AbdominalsLevelGained}`}</Text> : <></>}
              {summary.legsExpGained ? <Text style={styles.text1}>{`Legs Exp Gained: ${summary.legsExpGained}`}</Text> : <></>}
              {summary.legsLevelGained ? <Text style={styles.text1}>{`Legs Level Gained: ${summary.legsLevelGained}`}</Text> : <></>}
              {summary.shouldersExpGained ? <Text style={styles.text1}>{`Shoulders Exp Gained: ${summary.shouldersExpGained}`}</Text> : <></>}
              {summary.shouldersLevelGained ? <Text style={styles.text1}>{`Shoulders Level Gained: ${summary.shouldersLevelGained}`}</Text> : <></>}
              {summary.cardioExpGained ? <Text style={styles.text1}>{`Cardio Exp Gained: ${summary.cardioExpGained}`}</Text> : <></>}
              {summary.cardioLevelGained ? <Text style={styles.text1}>{`Cardio Level Gained: ${summary.cardioLevelGained}`}</Text> : <></>}
              {summary.stretchingExpGained ? <Text style={styles.text1}>{`Stretching Exp Gained: ${summary.stretchingExpGained}`}</Text> : <></>}
              {summary.stretchingLevelGained ? <Text style={styles.text1}>{`Stretching Level Gained: ${summary.stretchingLevelGained}`}</Text> : <></>}
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
    marginTop: 80,
    borderRadius: 15,
    margin: 40,
    padding: 10,
    opacity: 0.8,
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

export default SessionSummary;
