import React, { useContext, useState, useEffect } from 'react'
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
} from 'react-native'
import { AuthContext } from '../context/AuthContext'

const SessionSummary = ({ navigation }) => {
  const { summary, currentOpponent, user, getUserAfterComplete } = useContext(AuthContext)

  const back = () => {
    navigation.navigate('UserHome')
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <View style={styles.pageContainer}>
          <View style={styles.summaryInfo}>
            <Text style={styles.text}>Great Job!</Text>

            <View style={styles.textContainer}>
              {summary ? (
                <>
                  <View style={styles.opponent}>
                    {summary.opponentDefeated ? (
                      <>
                        {summary.damageDealt ? (
                          <Text
                            style={styles.text1}
                          >{`Damage Dealt to ${summary.opponentDefeated}: ${summary.damageDealt}`}</Text>
                        ) : (
                          <></>
                        )}
                        <Text
                          style={styles.text1}
                        >{`You have defeated ${summary.opponentDefeated}!`}</Text>
                        <Text style={styles.text}>Rewards</Text>
                      </>
                    ) : summary.damageDealt ? (
                      <Text
                        style={styles.text1}
                      >{`Damage Dealt to ${currentOpponent.name}: ${summary.damageDealt}`}</Text>
                    ) : (
                      <></>
                    )}

                    {summary.coinsGained ? (
                      <Text
                        style={styles.text1}
                      >{`Coins Gained: ${summary.coinsGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.newItem.length > 0 ? (
                      <Text
                        style={styles.text1}
                      >{`New Items Gained: ${summary.newItem.join(
                        ', '
                      )}`}</Text>
                    ) : (
                      <></>
                    )}
                  </View>
                  <View style={styles.experience}>
                    <Text style={styles.text}>Experience Gained</Text>
                    {summary.expGained ? (
                      <Text
                        style={styles.text1}
                      >{`Character Exp Gained: ${summary.expGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.characterLevelGained ? (
                      <Text
                        style={styles.text1}
                      >{`Character Levels Gained: ${summary.characterLevelGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.chestExpGained ? (
                      <Text
                        style={styles.text1}
                      >{`Chest Exp Gained: ${summary.chestExpGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.chestLevelGained ? (
                      <Text
                        style={styles.text1}
                      >{`Chest Level Gained: ${summary.chestLevelGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.backExpGained ? (
                      <Text
                        style={styles.text1}
                      >{`Back Exp Gained: ${summary.backExpGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.backLevelGained ? (
                      <Text
                        style={styles.text1}
                      >{`Back Level Gained: ${summary.backLevelGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.armsExpGained ? (
                      <Text
                        style={styles.text1}
                      >{`Arms Exp Gained: ${summary.armsExpGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.armsLevelGained ? (
                      <Text
                        style={styles.text1}
                      >{`Arms Level Gained: ${summary.armsLevelGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.abdominalsExpGained ? (
                      <Text
                        style={styles.text1}
                      >{`Abdominals Exp Gained: ${summary.AbdominalsExpGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.abdominalsLevelGained ? (
                      <Text
                        style={styles.text1}
                      >{`Abdominals Level Gained: ${summary.AbdominalsLevelGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.legsExpGained ? (
                      <Text
                        style={styles.text1}
                      >{`Legs Exp Gained: ${summary.legsExpGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.legsLevelGained ? (
                      <Text
                        style={styles.text1}
                      >{`Legs Level Gained: ${summary.legsLevelGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.shouldersExpGained ? (
                      <Text
                        style={styles.text1}
                      >{`Shoulders Exp Gained: ${summary.shouldersExpGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.shouldersLevelGained ? (
                      <Text
                        style={styles.text1}
                      >{`Shoulders Level Gained: ${summary.shouldersLevelGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.cardioExpGained ? (
                      <Text
                        style={styles.text1}
                      >{`Cardio Exp Gained: ${summary.cardioExpGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.cardioLevelGained ? (
                      <Text
                        style={styles.text1}
                      >{`Cardio Level Gained: ${summary.cardioLevelGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.stretchingExpGained ? (
                      <Text
                        style={styles.text1}
                      >{`Stretching Exp Gained: ${summary.stretchingExpGained}`}</Text>
                    ) : (
                      <></>
                    )}
                    {summary.stretchingLevelGained ? (
                      <Text
                        style={styles.text1}
                      >{`Stretching Level Gained: ${summary.stretchingLevelGained}`}</Text>
                    ) : (
                      <></>
                    )}
                  </View>
                </>
              ) : (
                <Text style={styles.text}>No Summary Found</Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  title="Back"
                  color="white"
                  onPress={() => {
                    back()
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

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
    justifyContent: 'space-between',
    marginTop: 80,
    borderRadius: 15,
    margin: 40,
    padding: 10,
    opacity: 0.8,
  },
  summary: {
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },

  text1: {
    fontSize: 15,
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

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'black',
    padding: 2,
    margin: 50,
    borderRadius: 15,
    width: '50%',
  },

  opponent: {
    marginTop: 15,
    alignItems: 'center',
  },

  experience: {
    marginTop: 15,
    alignItems: 'center',
  },
})

export default SessionSummary
