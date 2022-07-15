import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Bar } from 'react-native-progress';

const Character = ({ navigation }) => {
  const { user, getSession, userItems, getUserItems, updateUserItems } =
    useContext(AuthContext);
  const [showInventory, setShowInventory] = useState(false);
  const [chestItem, setChestItem] = useState(null || userItems[user.chest]);
  const [headItem, setHeadItem] = useState(null || userItems[user.head]);
  const [legItem, setLegItem] = useState(null || userItems[user.leg]);
  const [ringItem, setRingItem] = useState(null || userItems[user.ring]);
  const [weaponItem, setWeaponItem] = useState(null || userItems[user.weapon]);
  const [combatSkill, setCombatSkill] = useState(0 || user.combatSkill);
  const [abdominalsLevel, setAbdominalsLevel] = useState(
    0 || user.abdominalsCurrentLevel
  );
  const [armsLevel, setArmsLevel] = useState(0 || user.armsCurrentLevel);
  const [backLevel, setBackLevel] = useState(0 || user.backCurrentLevel);
  const [cardioLevel, setCardioLevel] = useState(0 || user.cardioCurrentLevel);
  const [chestLevel, setChestLevel] = useState(0 || user.chestCurrentLevel);
  const [legsLevel, setLegsLevel] = useState(0 || user.legsCurrentLevel);
  const [shouldersLevel, setShouldersLevel] = useState(
    0 || user.shouldersCurrentLevel
  );
  const [stretchingLevel, setStretchingLevel] = useState(
    0 || user.stretchingCurrentLevel
  );
  const [abdominalsLevelBonus, setAbdominalsLevelBonus] = useState(0);
  const [armsLevelBonus, setArmsLevelBonus] = useState(0);
  const [backLevelBonus, setBackLevelBonus] = useState(0);
  const [cardioLevelBonus, setCardioLevelBonus] = useState(0);
  const [chestLevelBonus, setChestLevelBonus] = useState(0);
  const [legsLevelBonus, setLegsLevelBonus] = useState(0);
  const [shouldersLevelBonus, setShouldersLevelBonus] = useState(0);
  const [stretchingLevelBonus, setStretchingLevelBonus] = useState(0);

  const showInventoryFunc = () => {
    if (showInventory) {
      setShowInventory(false);
    } else {
      setShowInventory(true);
    }
  };

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

  //grab items if user has items

  // let currentLevelString = user.currentLevel.toString();
  // console.log(getSession);
  // console.log(levelExp);
  // console.log(levelExp[currentLevelString]);
  // console.log(userItems);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <View style={styles.main}>
          <View style={styles.top}>
            <View style={styles.container}>
              <Image
                source={{
                  uri: 'https://i.imgur.com/4Ef2wUE.png',
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
                color={'red'}
                height={15}
              />
              <Text>
                {user.currentLevelExp} /{' '}
                {levelExp[(user.currentLevel + 1).toString()]} XP
              </Text>
              <Text>Coins: ${user.coins}</Text>
              <Text>Combat Skill: {combatSkill}</Text>
            </View>
          </View>
          <View style={styles.allSkillsContainer}>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Abdominals</Text>
              {abdominalsLevelBonus > 0 ? (
                <Text style={styles.skillsLevelBonus}>
                  Level {abdominalsLevel + abdominalsLevelBonus}

              )}
              <Bar
                progress={
                  user.abdominalsCurrentLevelExp /
                  levelExp[(user.abdominalsCurrentLevel + 1).toString()]
                }
                color={'red'}
                width={150}
                height={15}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Arms</Text>
              {armsLevelBonus > 0 ? (
                <Text style={styles.skillsLevelBonus}>
                  Level {armsLevel + armsLevelBonus}
                </Text>
              ) : (
                <Text style={styles.skillsLevel}>
                  Level {armsLevel + armsLevelBonus}
                </Text>
              )}
              <Bar
                progress={
                  user.armsCurrentLevelExp /
                  levelExp[(user.armsCurrentLevel + 1).toString()]
                }
                color={'orange'}
                width={150}
                height={15}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Back</Text>
              {backLevelBonus > 0 ? (
                <Text style={styles.skillsLevelBonus}>
                  Level {backLevel + backLevelBonus}
                </Text>
              ) : (
                <Text style={styles.skillsLevel}>
                  Level {backLevel + backLevelBonus}
                </Text>
              )}
              <Bar
                progress={
                  user.backCurrentLevelExp /
                  levelExp[(user.backCurrentLevel + 1).toString()]
                }
                color={'yellow'}
                width={150}
                height={15}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Cardio</Text>
              {cardioLevelBonus > 0 ? (
                <Text style={styles.skillsLevelBonus}>
                  Level {cardioLevel + cardioLevelBonus}
                </Text>
              ) : (
                <Text style={styles.skillsLevel}>
                  Level {cardioLevel + cardioLevelBonus}
                </Text>
              )}
              <Bar
                progress={
                  user.cardioCurrentLevelExp /
                  levelExp[(user.cardioCurrentLevel + 1).toString()]
                }
                color={'lime'}
                width={150}
                height={15}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Chest</Text>
              {chestLevelBonus > 0 ? (
                <Text style={styles.skillsLevelBonus}>
                  Level {chestLevel + chestLevelBonus}
                </Text>
              ) : (
                <Text style={styles.skillsLevel}>
                  Level {chestLevel + chestLevelBonus}
                </Text>
              )}
              <Bar
                progress={
                  user.chestCurrentLevelExp /
                  levelExp[(user.chestCurrentLevel + 1).toString()]
                }
                color={'green'}
                width={150}
                height={15}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Legs</Text>
              {legsLevelBonus > 0 ? (
                <Text style={styles.skillsLevelBonus}>
                  Level {legsLevel + legsLevelBonus}
                </Text>
              ) : (
                <Text style={styles.skillsLevel}>
                  Level {legsLevel + legsLevelBonus}
                </Text>
              )}
              <Bar
                progress={
                  user.legsCurrentLevelExp /
                  levelExp[(user.legsCurrentLevel + 1).toString()]
                }
                color={'blue'}
                width={150}
                height={15}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Shoulders</Text>
              {shouldersLevelBonus > 0 ? (
                <Text style={styles.skillsLevelBonus}>
                  Level {shouldersLevel + shouldersLevelBonus}
                </Text>
              ) : (
                <Text style={styles.skillsLevel}>
                  Level {shouldersLevel + shouldersLevelBonus}
                </Text>
              )}
              <Bar
                progress={
                  user.shouldersCurrentLevelExp /
                  levelExp[(user.shouldersCurrentLevel + 1).toString()]
                }
                color={'purple'}
                width={150}
                height={15}
              />
            </View>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillsTitle}>Stretching</Text>
              {stretchingLevelBonus > 0 ? (
                <Text style={styles.skillsLevelBonus}>
                  Level {stretchingLevel + stretchingLevelBonus}
                </Text>
              ) : (
                <Text style={styles.skillsLevel}>
                  Level {stretchingLevel + stretchingLevelBonus}
                </Text>
              )}
              <Bar
                progress={
                  user.stretchingCurrentLevelExp /
                  levelExp[(user.stretchingCurrentLevel + 1).toString()]
                }
                color={'pink'}
                width={150}
                height={15}
              />
            </View>
          </View>
          <View style={styles.allItemsContainer}>
            <View style={styles.singleItemContainer}>
              {headItem ? (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        setHeadItem(null);
                      }}
                    >
                      {headItem.name}
                    </Text>
                  </View>
                  <View style={styles.intentoryTextTitleContainer}>
                    <Text>Head</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        showInventoryFunc();
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
              {chestItem ? (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        setChestItem(null);
                      }}
                    >
                      {chestItem.name}
                    </Text>
                  </View>
                  <View style={styles.intentoryTextTitleContainer}>
                    <Text>Chest</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        showInventoryFunc();
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
              {legItem ? (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        setLegItem(null);
                      }}
                    >
                      {legItem.name}
                    </Text>
                  </View>
                  <View style={styles.intentoryTextTitleContainer}>
                    <Text>Leg</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        showInventoryFunc();
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
              {weaponItem ? (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        setWeaponItem(null);
                      }}
                    >
                      {weaponItem.name}
                    </Text>
                  </View>
                  <View style={styles.intentoryTextTitleContainer}>
                    <Text>Weapon</Text>
                  </View>
                </View>

              ) : (
                <View>
                  <View style={styles.emptyInventorySlot}>
                    <Text
                      style={styles.emptyInventoryText}
                      onPress={() => {
                        showInventoryFunc();
                      }}
                    >
                      Equip
                    </Text>
                  </View>
                  <View style={styles.intentoryTextTitleContainer}>
                    <Text>Weapon</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          {showInventory ? (
            <View style={styles.allItemsContainer}>
              {userItems.map((item) => {
                if (
                  headItem === item ||
                  chestItem === item ||
                  legItem === item ||
                  ringItem === item ||
                  weaponItem === item
                ) {
                  return <View key={item.id}></View>;
                } else {
                  return (
                    <View key={item.id} style={styles.singleItemContainer}>
                      <View style={styles.emptyInventorySlot}>
                        <Text
                          style={styles.emptyInventoryText}
                          onPress={() => {
                            if (item.type === 'head') {
                              setHeadItem(item);
                            } else if (item.type === 'chest') {
                              setChestItem(item);
                            } else if (item.type === 'leg') {
                              setLegItem(item);
                            } else if (item.type === 'ring') {
                              setRingItem(item);
                            } else if (item.type === 'weapon') {
                              setWeaponItem(item);
                            }
                            updateUserItems(user.id, item.id);
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View style={styles.intentoryTextTitleContainer}>
                        <Text>{item.type}</Text>
                      </View>
                    </View>
                  );
                }
              })}
            </View>
          ) : (
            <View></View>
          )}
          {!showInventory ? (
            <View style={styles.button}>
              <ScrollView>
                <Button
                  color="black"
                  title="Inventory"
                  onPress={() => {
                    showInventoryFunc();
                  }}
                />
              </ScrollView>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    marginTop: 50,

    opacity: 0.8,

    borderRadius: 10,
  },
  top: {
    flexDirection: 'row',
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
  skillsLevelBonus: {
    width: 60,
    color: 'red',
  },

  allItemsContainer: {
    flexDirection: 'row',
    maxWidth: 400,
    flex: 1,
    flexWrap: 'wrap',
    borderRadius: 10,
    opacity: 0.8,
    margin: 10,
    padding: 10,
  },
  singleItemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    padding: 5,
    minWidth: 70,
  },
  emptyInventorySlot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAAAAA',
    borderRadius: 10,
    height: 70,
    width: 70,
  },
  emptyInventoryText: {
    color: 'black',
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
    margin: 60,
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
