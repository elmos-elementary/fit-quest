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
          <Text style={styles.text}>Hello this needs the routine name </Text>
        </View>

        {singleSession.sessionExercises.map((exercise) => {
          return (
            <View key={exercise.id} style={{ margin: 20 }}>
              <View style={styles.routineContainer}>
                <Text style={styles.routineName}>{exercise.exercise.name}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 15 }}>Set</Text>
                    <Text>1</Text>
                    <Text>2</Text>
                    <Text>3</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text>Weight (lbs)</Text>
                    <Text>{exercise.weight1}</Text>
                    <Text>{exercise.weight2}</Text>
                    <Text>{exercise.weight3}</Text>
                  </View>
                  <View style={{ alignItems: 'center', padding: 2 }}>
                    <Text>Reps</Text>
                    <Text>{exercise.set1}</Text>
                    <Text>{exercise.set2}</Text>
                    <Text>{exercise.set3}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <Button
          title="Go Back"
          onPress={() => {
            navigation.navigate('UserHistory');
          }}
        />
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
  textContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 30,

    borderRadius: 5,
    borderColor: '#3D3D3D',
    borderWidth: 1,
    padding: 4,
    margin: 5,
  },
});

export default UserSingleSession;
