import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { image } from './UserHome';
import { AuthContext } from '../context/AuthContext';
import { FlatList } from 'react-native';

const StartWorkout = ({ navigation }) => {
  const { routine } = useContext(AuthContext);
  console.log(routine);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Choose Routine</Text>
          <View>
            <FlatList
              data={routine}
              renderItem={({ item }) => (
                <View>
                  <Text>{routine.name}</Text>
                  <Text>{routine.exercise}</Text>
                </View>
              )}
            />
          </View>
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

  text: {
    fontSize: 30,
    borderRadius: 5,
    borderColor: '#3D3D3D',
    borderWidth: 1,
    padding: 4,
    margin: 5,
  },
});

export default StartWorkout;
