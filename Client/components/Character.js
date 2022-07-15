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
        ></ImageBackground>
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
