import { Text, View, Button, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { image } from './UserHome';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>FIT QUEST</Text>
          </View>
          <View style={styles.button}>
            <Button
              title="Get Started"
              color="black"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
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
  textContainer: {
    alignItems: 'center',
    margin: 70,
  },
  button: {
    borderWidth: 1,
    borderColor: '#3D3D3D',
    backgroundColor: '#7E7E7E',
    borderRadius: 10,
    width: '60%',
    marginRight: 8,
    marginTop: 8,
    padding: 3,
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
  text: {
    fontSize: 30,
    borderRadius: 5,
    borderColor: '#3D3D3D',
    borderWidth: 1,
    padding: 4,
    margin: 5,
  },
});
export default HomeScreen;
