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
  ScrollView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Bar } from 'react-native-progress';
import * as Font from 'expo-font';

const Character = ({ navigation }) => {
  const {
    user,
    getSession,
    userItems,
    getUserItems,
    getAllItems,
    updateUserItems,
    unequipUserItem,
    allItems,
  } = useContext(AuthContext);
  const [showInventory, setShowInventory] = useState(false);
  const [chestItem, setChestItem] = useState(null || allItems[user.chest - 1]);
  const [headItem, setHeadItem] = useState(null || allItems[user.head - 1]);
  const [legItem, setLegItem] = useState(null || allItems[user.leg - 1]);
  const [ringItem, setRingItem] = useState(null || allItems[user.ring - 1]);
  const [weaponItem, setWeaponItem] = useState(
    null || allItems[user.weapon - 1]
  );
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
  const [selectedItem, setSelectedItem] = useState(-1);
  const [selectedItemIsEquipped, setSelectedItemIsEquipped] = useState(false);

  const showInventoryFunc = () => {
    if (showInventory) {
      setShowInventory(false);
    } else {
      setShowInventory(true);
    }
  };

  const isSelectedItemEquipped = (item) => {
    if (
      headItem === item ||
      chestItem === item ||
      legItem === item ||
      ringItem === item ||
      weaponItem === item
    ) {
      setSelectedItemIsEquipped(true);
    } else {
      setSelectedItemIsEquipped(false);
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
  useEffect(() => {
    getUserItems(user.id);
    getAllItems();
  }, []);

  // let currentLevelString = user.currentLevel.toString();
  // console.log(getSession);
  // console.log(levelExp);
  // console.log(levelExp[currentLevelString]);
  // console.log(userItems);
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../src/assets/background.jpeg')}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.main}>
            {/* Character Information */}
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
                <Text>Combat Skill: {combatSkill}</Text>
              </View>
            </View>

            {/* Skills */}
            <View style={styles.allSkillsContainer}>
              <View style={styles.skillsContainer}>
                <Text style={styles.skillsTitle}>Abdominals</Text>
                {abdominalsLevelBonus > 0 ? (
                  <Text style={styles.skillsLevelBonus}>
                    Level {abdominalsLevel + abdominalsLevelBonus}
                  </Text>
                ) : (
                  <Text style={styles.skillsLevel}>
                    Level {abdominalsLevel + abdominalsLevelBonus}
                  </Text>
                )}
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
                  color={'grey'}
                  width={150}
                  height={16}
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
                  color={'grey'}
                  width={150}
                  height={16}
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
                  color={'grey'}
                  width={150}
                  height={16}
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
                  color={'grey'}
                  width={150}
                  height={16}
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
                  color={'grey'}
                  width={150}
                  height={16}
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
                  color={'grey'}
                  width={150}
                  height={16}
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
                  color={'grey'}
                  width={150}
                  height={16}
                />
              </View>
            </View>

            {/* Inventory Button */}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  color="white"
                  title="Open Inventory"
                  onPress={() => {
                    setShowInventory(true);
                    setSelectedItem(-1);
                    setSelectedItemIsEquipped(false);
                  }}
                />
              </View>
            </View>

            {/* Inventory Modal */}
            <Modal
              visible={showInventory}
              animationType={'slide'}
              presentationStyle={'overFullScreen'}
            >
              <View style={styles.modalContainer}>
                <ImageBackground
                  source={require('../../src/assets/background.jpeg')}
                  resizeMode="cover"
                  style={styles.backgroundImage}
                >
                  {/* Inventory Button */}
                  <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                      <Button
                        color="white"
                        title="Close Inventory"
                        onPress={() => {
                          setShowInventory(false);
                          setSelectedItem(-1);
                          setSelectedItemIsEquipped(false);
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.topContainerModal}>
                    {/* Currently Equiped */}
                    <View style={styles.allItemsContainerModal}>
                      <View style={styles.singleItemContainer}>
                        {headItem ? (
                          <View>
                            <View
                              style={
                                selectedItem.id === headItem.id
                                  ? styles.selectedInventorySlot
                                  : styles.emptyInventorySlot
                              }
                            >
                              <Text
                                style={styles.emptyInventoryText}
                                onPress={() => {
                                  setSelectedItem(headItem);
                                  setSelectedItemIsEquipped(true);
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
                                onPress={() => {}}
                              >
                                Empty
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
                            <View
                              style={
                                selectedItem.id === chestItem.id
                                  ? styles.selectedInventorySlot
                                  : styles.emptyInventorySlot
                              }
                            >
                              <Text
                                style={styles.emptyInventoryText}
                                onPress={() => {
                                  setSelectedItem(chestItem);
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
                                onPress={() => {}}
                              >
                                Empty
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
                            <View
                              style={
                                selectedItem.id === legItem.id
                                  ? styles.selectedInventorySlot
                                  : styles.emptyInventorySlot
                              }
                            >
                              <Text
                                style={styles.emptyInventoryText}
                                onPress={() => {
                                  setSelectedItem(legItem);
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
                                onPress={() => {}}
                              >
                                Empty
                              </Text>
                            </View>
                            <View style={styles.intentoryTextTitleContainer}>
                              <Text>Legs</Text>
                            </View>
                          </View>
                        )}
                      </View>
                      <View style={styles.singleItemContainer}>
                        {ringItem ? (
                          <View>
                            <View
                              style={
                                selectedItem.id === ringItem.id
                                  ? styles.selectedInventorySlot
                                  : styles.emptyInventorySlot
                              }
                            >
                              <Text
                                style={styles.emptyInventoryText}
                                onPress={() => {
                                  setSelectedItem(ringItem);
                                }}
                              >
                                {ringItem.name}
                              </Text>
                            </View>
                            <View style={styles.intentoryTextTitleContainer}>
                              <Text>Ring</Text>
                            </View>
                          </View>
                        ) : (
                          <View>
                            <View style={styles.emptyInventorySlot}>
                              <Text
                                style={styles.emptyInventoryText}
                                onPress={() => {}}
                              >
                                Empty
                              </Text>
                            </View>
                            <View style={styles.intentoryTextTitleContainer}>
                              <Text>Ring</Text>
                            </View>
                          </View>
                        )}
                      </View>
                      <View style={styles.singleItemContainer}>
                        {weaponItem ? (
                          <View>
                            <View
                              style={
                                selectedItem.id === weaponItem.id
                                  ? styles.selectedInventorySlot
                                  : styles.emptyInventorySlot
                              }
                            >
                              <Text
                                style={styles.emptyInventoryText}
                                onPress={() => {
                                  setSelectedItem(weaponItem);
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
                                onPress={() => {}}
                              >
                                Empty
                              </Text>
                            </View>
                            <View style={styles.intentoryTextTitleContainer}>
                              <Text>Weapon</Text>
                            </View>
                          </View>
                        )}
                      </View>
                    </View>

                    {/* Currently Selected Item */}
                    <View style={styles.allItemsContainerModal}>
                      {selectedItem !== -1 ? (
                        <View>
                          <View style={styles.emptyInventorySlot}>
                            <Text
                              style={styles.emptyInventoryText}
                              onPress={() => {}}
                            >
                              {selectedItem.name}
                            </Text>
                          </View>
                          <View style={styles.intentoryTextTitleContainer}>
                            <Text>{selectedItem.name}</Text>
                          </View>
                          {selectedItemIsEquipped ? (
                            <Text
                              onPress={() => {
                                if (selectedItem.type === 'head') {
                                  setHeadItem(null);
                                } else if (selectedItem.type === 'chest') {
                                  setChestItem(null);
                                } else if (selectedItem.type === 'leg') {
                                  setLegItem(null);
                                } else if (selectedItem.type === 'ring') {
                                  setRingItem(null);
                                } else if (selectedItem.type === 'weapon') {
                                  setWeaponItem(null);
                                }
                                unequipUserItem(user.id, selectedItem.type);
                                setSelectedItemIsEquipped(false);
                              }}
                            >
                              Click to unequip
                            </Text>
                          ) : (
                            <Text
                              onPress={() => {
                                if (selectedItem.type === 'head') {
                                  setHeadItem(selectedItem);
                                } else if (selectedItem.type === 'chest') {
                                  setChestItem(selectedItem);
                                } else if (selectedItem.type === 'leg') {
                                  setLegItem(selectedItem);
                                } else if (selectedItem.type === 'ring') {
                                  setRingItem(selectedItem);
                                } else if (selectedItem.type === 'weapon') {
                                  setWeaponItem(selectedItem);
                                }
                                updateUserItems(user.id, selectedItem.id);
                                setSelectedItemIsEquipped(true);
                              }}
                            >
                              Click to equip
                            </Text>
                          )}
                        </View>
                      ) : (
                        <Text>
                          Click on one of your currently equiped items or your
                          inventory items to see its details.
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* Full Inventory */}
                  <ScrollView>
                    <View style={styles.allItemsContainer}>
                      {userItems.length < 1 ? (
                        <View style={styles.modalContainer}>
                          <Text>
                            You have no items. Go workout for a chance to earn
                            them!
                          </Text>
                        </View>
                      ) : (
                        userItems.map((item) => {
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
                              <View
                                key={item.id}
                                style={styles.singleItemContainer}
                              >
                                <View
                                  style={
                                    selectedItem.id === item.id
                                      ? styles.selectedInventorySlot
                                      : styles.emptyInventorySlot
                                  }
                                >
                                  <Text
                                    style={styles.emptyInventoryText}
                                    onPress={() => {
                                      setSelectedItem(item);
                                      setSelectedItemIsEquipped(false);
                                      // if (item.type === 'head') {
                                      //   setHeadItem(item);
                                      // } else if (item.type === 'chest') {
                                      //   setChestItem(item);
                                      // } else if (item.type === 'leg') {
                                      //   setLegItem(item);
                                      // } else if (item.type === 'ring') {
                                      //   setRingItem(item);
                                      // } else if (item.type === 'weapon') {
                                      //   setWeaponItem(item);
                                      // }
                                      // updateUserItems(user.id, item.id);
                                    }}
                                  >
                                    {item.name}
                                  </Text>
                                </View>
                                <View
                                  style={styles.intentoryTextTitleContainer}
                                >
                                  <Text>{item.type}</Text>
                                </View>
                              </View>
                            );
                          }
                        })
                      )}
                    </View>
                  </ScrollView>
                </ImageBackground>
              </View>
            </Modal>

            {/* {showInventory ? (
              <View style={styles.allItemsContainer}>
                {userItems.length < 1 ? (
                  <View>
                    <Text>
                      You have no items. Go workout for a chance to earn them!
                    </Text>
                  </View>
                ) : (
                  userItems.map((item) => {
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
                  })
                )}
              </View>
            ) : (
              <View></View>
            )}
            {!showInventory ? (
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    color="white"
                    title="Inventory"
                    onPress={() => {
                      showInventoryFunc();
                    }}
                  />
                </View>
              </View>
            ) : (
              <View></View>
            )} */}
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
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
  skillsLevelBonus: {
    width: 60,
    color: 'red',
  },
  allItemsContainer: {
    flexDirection: 'row',
    maxWidth: 400,
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
    margin: 10,
    padding: 10,
  },
  singleItemContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    margin: 5,
    padding: 5,
    minWidth: 70,
  },
  emptyInventorySlot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
    height: 70,
    width: 70,
  },
  selectedInventorySlot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
    height: 70,
    width: 70,
    borderColor: 'red',
    borderWidth: 3,
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
    margin: 8,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    width: '100%',
    flexDirection: 'row',
  },
  allItemsContainerModal: {
    flexDirection: 'row',
    maxWidth: 400,
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
    margin: 10,
    padding: 10,
    maxWidth: 200,
  },
  topContainerModal: {
    flexDirection: 'row',
  },
});

export default Character;
