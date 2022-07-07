import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import StartWorkout from './StartWorkout';

export const image = {
  uri: 'https://imgur.com/rJ1GVWj.jpg',
};
const UserHome = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.image}>
          <Image source={require('../../src/assets/favicon.png')} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 20, fontFamily: 'Helvetica' }}>
            Username
          </Text>
          <Text style={{ fontSize: 18, fontFamily: 'Helvetica' }}>Class</Text>
          <Text style={{ fontSize: 15, fontFamily: 'Helvetica' }}>
            Level 99
          </Text>
          <ProgressBar progress={0.5} />
          <View style={styles.button}>
            <Button
              color="black"
              title="Start Workout"
              onPress={() => {
                navigation.navigate('StartWorkout');
              }}
            />
          </View>
          <View style={styles.button}>
            <Button color="black" title="History" />
          </View>
          <View style={styles.button}>
            <Button color="black" title="Character" />
          </View>

          <View>
            <Button
              title="logout"
              style={{ margin: 10 }}
              onPress={() => {
                logout();
              }}
            ></Button>
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
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
  },

  button: {
    borderWidth: 1,
    borderColor: '#3D3D3D',
    backgroundColor: '#7E7E7E',
    borderRadius: 20,
    width: '60%',
    marginRight: 8,
    marginTop: 8,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserHome;
