import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Bar } from 'react-native-progress';
import * as Font from 'expo-font';

const Character = ({ navigation }) => {
  const { user, getSession, userItems, getUserItems } = useContext(AuthContext);
  const [showInventory, setShowInventory] = useState(false);
  const [showHead, setShowHead] = useState(false);
  const [showChest, setShowChest] = useState(false);
  const [showLeg, setShowLeg] = useState(false);
  const [showRing, setShowRing] = useState(false);
  const [chestItem, setChestItem] = useState(null || user.chest);
  const [headItem, setHeadItem] = useState(null);
  const [legItem, setLegItem] = useState(null);
  const [ringItem, setRingItem] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  //Send current items to state
  // while (firstLoad) {
  //   setChestItem(user.chest)
  //   setFirstLoad(true)
  // }

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
  // let currentLevelString = user.currentLevel.toString();
  // console.log(getSession);
  // console.log(levelExp);
  // console.log(levelExp[currentLevelString]);
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
                progress={
                  user.currentLevelExp /
                  levelExp[(user.currentLevel + 1).toString()]
                }
                color={'grey'}
                height={16}
              />
              <Text>
                {user.currentLevelExp} /{' '}
                {levelExp[(user.currentLevel + 1).toString()]} XP
              </Text>
              <Text>Coins: ${user.coins}</Text>
            </View>
          </View>
          <View style={styles.allSkillsContainer}>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Abdominals</Text>
              <Text style={styles.skillsLevel}>
                Level {user.abdominalsCurrentLevel}
              </Text>
              <Bar
                progress={
                  user.abdominalsCurrentLevelExp /
                  levelExp[(user.abdominalsCurrentLevel + 1).toString()]
                }
                color={'grey'}
                width={150}
                height={16}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Arms</Text>
              <Text style={styles.skillsLevel}>
                Level {user.armsCurrentLevel}
              </Text>
              <Bar
                progress={
                  user.armsCurrentLevelExp /
                  levelExp[(user.armsCurrentLevel + 1).toString()]
                }
                color={'grey'}
                width={150}
                height={16}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Back</Text>
              <Text style={styles.skillsLevel}>
                Level {user.backCurrentLevel}
              </Text>
              <Bar
                progress={
                  user.backCurrentLevelExp /
                  levelExp[(user.backCurrentLevel + 1).toString()]
                }
                color={'grey'}
                width={150}
                height={16}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Cardio</Text>
              <Text style={styles.skillsLevel}>
                Level {user.cardioCurrentLevel}
              </Text>
              <Bar
                progress={
                  user.cardioCurrentLevelExp /
                  levelExp[(user.cardioCurrentLevel + 1).toString()]
                }
                color={'grey'}
                width={150}
                height={16}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Chest</Text>
              <Text style={styles.skillsLevel}>
                Level {user.chestCurrentLevel}
              </Text>
              <Bar
                progress={
                  user.chestCurrentLevelExp /
                  levelExp[(user.chestCurrentLevel + 1).toString()]
                }
                color={'grey'}
                width={150}
                height={16}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Legs</Text>
              <Text style={styles.skillsLevel}>
                Level {user.legsCurrentLevel}
              </Text>
              <Bar
                progress={
                  user.legsCurrentLevelExp /
                  levelExp[(user.legsCurrentLevel + 1).toString()]
                }
                color={'grey'}
                width={150}
                height={16}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Shoulders</Text>
              <Text style={styles.skillsLevel}>
                Level {user.shouldersCurrentLevel}
              </Text>
              <Bar
                progress={
                  user.shouldersCurrentLevelExp /
                  levelExp[(user.shouldersCurrentLevel + 1).toString()]
                }
                color={'grey'}
                width={150}
                height={16}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Stretching</Text>
              <Text style={styles.skillsLevel}>
                Level {user.stretchingCurrentLevel}
              </Text>
              <Bar
                progress={
                  user.stretchingCurrentLevelExp /
                  levelExp[(user.stretchingCurrentLevel + 1).toString()]
                }
                color={'grey'}
                width={150}
                height={16}
              />
            </View>
          </View>
          <View style={styles.allItemsContainer}>
            <View style={styles.singleItemContainer}>
              {user.head ? (
                <View>
                  <View>
                    <Text>The Item goes here</Text>
                  </View>
                  <Text>Head</Text>
                </View>
              ) : (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        if (showHead) {
                          setShowHead(false);
                        } else {
                          setShowHead(true);
                          setShowChest(false);
                          setShowLeg(false);
                          setShowRing(false);
                          setShowInventory(false);
                        }
                      }}
                    >
                      Equip
                    </Text>
                  </View>
                  <View style={styles.intentoryTextTitleContainer}>
                    <Text>Head</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.singleItemContainer}>
              {user.chest ? (
                <View>
                  <View>
                    <Text>The Item goes here</Text>
                  </View>
                  <Text>Chest</Text>
                </View>
              ) : (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        if (showChest) {
                          setShowChest(false);
                        } else {
                          setShowChest(true);
                          setShowHead(false);
                          setShowLeg(false);
                          setShowRing(false);
                          setShowInventory(false);
                        }
                      }}
                    >
                      Equip
                    </Text>
                  </View>
                  <View style={styles.intentoryTextTitleContainer}>
                    <Text>Chest</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.singleItemContainer}>
              {user.leg ? (
                <View>
                  <View>
                    <Text>The Item goes here</Text>
                  </View>
                  <Text>Legs</Text>
                </View>
              ) : (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        if (showLeg) {
                          setShowLeg(false);
                        } else {
                          setShowLeg(true);
                          setShowChest(false);
                          setShowHead(false);
                          setShowRing(false);
                          setShowInventory(false);
                        }
                      }}
                    >
                      Equip
                    </Text>
                  </View>
                  <View style={styles.intentoryTextTitleContainer}>
                    <Text>Legs</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.singleItemContainer}>
              {user.ring ? (
                <View>
                  <View>
                    <Text>The Item goes here</Text>
                  </View>
                  <Text>Ring</Text>
                </View>
              ) : (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        if (showRing) {
                          setShowRing(false);
                        } else {
                          setShowRing(true);
                          setShowChest(false);
                          setShowLeg(false);
                          setShowHead(false);
                          setShowInventory(false);
                        }
                      }}
                    >
                      Equip
                    </Text>
                  </View>
                  <View style={styles.intentoryTextTitleContainer}>
                    <Text>Ring</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          {showInventory ? (
            <View style={styles.openInventory}>
              {userItems.map((item) => {
                return (
                  <View key={item.id} style={styles.singleItemContainer}>
                    <View style={styles.emptyInventorySlot}>
                      <Text style={styles.emptyInventoryText}>{item.name}</Text>
                    </View>
                    <View style={styles.intentoryTextTitleContainer}>
                      <Text>{item.type}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View></View>
          )}
          {showHead ? (
            <View style={styles.openInventory}>
              <View>
                <View style={styles.emptyInventorySlot}>
                  <Text style={styles.emptyInventoryText}>Equip</Text>
                </View>
                <View style={styles.intentoryTextTitleContainer}>
                  <Text>Ring</Text>
                </View>
              </View>
            </View>
          ) : (
            <View></View>
          )}
          {showChest ? (
            <View style={styles.openInventory}>
              <Text>hello</Text>
            </View>
          ) : (
            <View></View>
          )}
          {showLeg ? (
            <View style={styles.openInventory}>
              <Text>hello</Text>
            </View>
          ) : (
            <View></View>
          )}
          {showRing ? (
            <View style={styles.openInventory}>
              <Text>hello</Text>
            </View>
          ) : (
            <View></View>
          )}
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                color="white"
                title="Inventory"
                onPress={() => {
                  if (showInventory) {
                    setShowInventory(false);
                  } else {
                    setShowInventory(true);
                    setShowChest(false);
                    setShowLeg(false);
                    setShowHead(false);
                    setShowRing(false);
                  }
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                color="white"
                title="Past Sessions"
                onPress={() => {
                  Alert.alert(
                    `You don't have no workouts! Get some more workouts in and earn those items!`
                  );
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                color="white"
                title="Edit Character"
                onPress={() => {
                  Alert.alert(
                    `You're not interesting enough to change! Level up and then maybe you can change!`
                  );
                }}
              />
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
    // justifyContent: 'center',
  },
  main: {
    flexDirection: 'column',
    paddingTop: 35,
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
    margin: 4,
  },
  skillsTitle: {
    width: 85,
  },
  skillsLevel: {
    width: 60,
  },
  allItemsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
    margin: 10,
    padding: 10,
  },
  singleItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
  emptyInventorySlot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
    height: 70,
    width: 70,
  },
  emptyInventoryText: {
    color: 'white',
  },
  intentoryTextTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 3,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
    margin: 10,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#3D3D3D',
    backgroundColor: 'grey',
    borderRadius: 20,
    width: '90%',
    marginRight: 8,
    marginTop: 8,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openInventory: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
    margin: 10,
    padding: 10,
  },
});

export default Character;
