import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

const UserHistory = ({ navigation }) => {
  const { userHistory, getSingleSession } = useContext(AuthContext);

  const onTouch = (id) => {
    getSingleSession(id).then(() => {
      navigation.navigate('UserSingleSession');
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.text}>Previous Workouts</Text>
        </View>
        <View style={styles.historyContainer}>
          <ScrollView>
            {userHistory.map((history, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={{ margin: 20 }}
                  onPress={() => {
                    onTouch(history.id);
                  }}
                >
                  <Text>{history.date}</Text>
                  <Text>{history.routine.name}</Text>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 2,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 5,
  },
  text: {
    fontSize: 30,
    borderRadius: 5,
    borderColor: '#3D3D3D',
    padding: 2,
    margin: 10,
    alignItems: 'center',
  },
  historyContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dddddd',
    margin: 30,
    opacity: 0.8,
    borderRadius: 5,
  },
});

export default UserHistory;
