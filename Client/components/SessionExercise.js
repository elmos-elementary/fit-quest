import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { image } from './UserHome';
import { AuthContext } from '../context/AuthContext';

const SessionExercise = ({ navigation }) => {
  const { sessionExercise, updateSessionExercise, user, getSession } =
    useContext(AuthContext);
  console.log('sessionExercise :>> ', sessionExercise);

  const [weight1, setWeight1] = useState(sessionExercise.weight1);
  const [weight2, setWeight2] = useState(sessionExercise.weight2);
  const [weight3, setWeight3] = useState(sessionExercise.weight3);
  const [set1, setSet1] = useState(sessionExercise.set1);
  const [set2, setSet2] = useState(sessionExercise.set2);
  const [set3, setSet3] = useState(sessionExercise.set3);

  const onTouch = (id) => {
    updateSessionExercise(id, {
      weight1,
      weight2,
      weight3,
      set1,
      set2,
      set3,
    })
      .then(() => {
        getSession(user.id);
      })
      .then(() => {
        navigation.navigate('SingleRoutine');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.text}>{sessionExercise.exercise.name}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ fontSize: 15 }}>Set</Text>
            <TextInput>1</TextInput>
            <TextInput>2</TextInput>
            <TextInput>3</TextInput>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>Weight (lbs)</Text>
            <TextInput onChangeText={(nextValue) => setWeight1(nextValue)}>
              {sessionExercise.weight1}
            </TextInput>
            <TextInput onChangeText={(nextValue) => setWeight2(nextValue)}>
              {sessionExercise.weight2}
            </TextInput>
            <TextInput onChangeText={(nextValue) => setWeight3(nextValue)}>
              {sessionExercise.weight3}
            </TextInput>
          </View>
          <View style={{ alignItems: 'center', padding: 2 }}>
            <Text>Reps</Text>
            <TextInput onChangeText={(nextValue) => setSet1(nextValue)}>
              {sessionExercise.set1}
            </TextInput>
            <TextInput onChangeText={(nextValue) => setSet2(nextValue)}>
              {sessionExercise.set2}
            </TextInput>
            <TextInput onChangeText={(nextValue) => setSet3(nextValue)}>
              {sessionExercise.set3}
            </TextInput>
          </View>
          <Button
            title="Record Exercise"
            onPress={() => {
              onTouch(sessionExercise.id);
            }}
          />
        </View>

        <ScrollView>
          <Text>{sessionExercise.exercise.description}</Text>
        </ScrollView>
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

export default SessionExercise;
