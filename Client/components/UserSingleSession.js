import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

const UserSingleSession = ({ navigation }) => {
  const { singleSession } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.text}>Completed Routine </Text>
        </View>

        {singleSession.sessionExercises.map((exercise) => {
          return (
            <ScrollView key={exercise.id}>
              <View style={{ margin: 20 }}>
                <View style={styles.routineContainer}>
                  <Text style={styles.routineName}>
                    {exercise.exercise.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.routineName}>Set</Text>
                      <Text>1</Text>
                      <Text>2</Text>
                      <Text>3</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.routineName}>Weight (lbs)</Text>
                      <Text>{exercise.weight1}</Text>
                      <Text>{exercise.weight2}</Text>
                      <Text>{exercise.weight3}</Text>
                    </View>
                    <View style={{ alignItems: 'center', padding: 2 }}>
                      <Text style={styles.routineName}>Reps</Text>
                      <Text>{exercise.set1}</Text>
                      <Text>{exercise.set2}</Text>
                      <Text>{exercise.set3}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          );
        })}
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
    margin: 20,
    opacity: 0.8,
    borderRadius: 5,
  },

  text: {
    fontSize: 30,
    borderRadius: 5,
    borderColor: '#3D3D3D',
    padding: 4,
  },

  routineContainer: {
    backgroundColor: '#dddddd',
    opacity: 0.9,
    borderRadius: 5,
    margin: 20,
  },

  routineName: {
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
});

export default UserSingleSession;
