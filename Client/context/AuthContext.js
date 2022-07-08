import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Font from 'expo-font';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [singleRoutine, setSingleRoutine] = useState(null);

  const login = async (email, password) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post(
        'https://fitquestapp.herokuapp.com/api/auth/login',
        {
          email,
          password,
        }
      );

      let foundUser = data;
      setUserInfo(foundUser);
      setUserToken(foundUser.token);
      AsyncStorage.setItem('userInfo', JSON.stringify(foundUser));
      AsyncStorage.setItem('userToken', foundUser.token);
      axios.defaults.headers.common['Authorization'] = foundUser.token;
      const user = await axios.get(
        'https://fitquestapp.herokuapp.com/api/auth/me'
      );

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async (email, password, firstName, lastName) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://fitquestapp.herokuapp.com/api/auth/signup',
        {
          email,
          password,
          firstName,
          lastName,
        }
      );
      let foundUser = data;

      setUserInfo(foundUser);
      setUserToken(foundUser.token);
      AsyncStorage.setItem('userInfo', JSON.stringify(foundUser));
      AsyncStorage.setItem('userToken', foundUser.token);
      axios.defaults.headers.common['Authorization'] = foundUser.token;

      const user = await axios.get(
        'https://fitquestapp.herokuapp.com/api/auth/me'
      );

      setIsLoading(false);
      return user;
    } catch (err) {
      console.error(err);
    }
  };

  const getRoutine = async () => {
    try {
      const { data } = await axios.get(
        'https://fitquestapp.herokuapp.com/api/routines'
      );

      setRoutine(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSingleRoutine = async (id) => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/routines/${id}`
      );

      setSingleRoutine(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    try {
      setIsLoading(true);
      setUserToken(null);
      AsyncStorage.removeItem('userInfo');
      AsyncStorage.removeItem('userToken');
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let foundUser = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      foundUser = JSON.parse(foundUser);
      // await Font.loadAsync(Helvetica);

      if (foundUser) {
        setUserToken(userToken);
        setUserInfo(foundUser);
      }

      setIsLoading(false);
    } catch (e) {
      console.log('is logged in error: ', e);
    }
  };

  useEffect(() => {
    isLoggedIn();
    getRoutine();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        signUp,
        routine,

        getSingleRoutine,
        singleRoutine,
        getRoutine,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
