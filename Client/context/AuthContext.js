import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [routine, setRoutine] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);

    const { data } = await axios.post(
      'https://fitquestapp.herokuapp.com/api/auth/login',
      { email, password }
    );
    let foundUser = data;
    setUserInfo(foundUser);
    setUserToken(foundUser.token);
    AsyncStorage.setItem('userInfo', JSON.stringify(foundUser));
    AsyncStorage.setItem('userToken', foundUser.token);
    // console.log(data.token);
    axios.defaults.headers.common['Authorization'] = foundUser.token;
    const user = await axios.get(
      'https://fitquestapp.herokuapp.com/api/auth/me'
    );
    setIsLoading(false);
  };

  const signUp = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    const { data } = await axios.post(
      'https://fitquestapp.herokuapp.com/api/auth/signup',
      { email, password, firstName, lastName }
    );
    console.log('data :>> ', data);
    let foundUser = data;

    setUserInfo(foundUser);

    console.log('userInfo :>> ', userInfo);
    console.log('userToken :>> ', userToken);
    setUserToken(foundUser.token);
    AsyncStorage.setItem('userInfo', JSON.stringify(foundUser));
    AsyncStorage.setItem('userToken', foundUser.token);
    axios.defaults.headers.common['Authorization'] = foundUser.token;

    const user = await axios.get(
      'https://fitquestapp.herokuapp.com/api/auth/me'
    );

    setIsLoading(false);
  };

  const getMe = async () => {
    setIsLoading(true);
    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    AsyncStorage.setItem('userToken', userToken);
    axios.defaults.headers.common['Authorization'] = userToken;
    const user = await axios.get(
      'https://fitquestapp.herokuapp.com/api/auth/me'
    );
    console.log(user);
    setIsLoading(false);
  };

  const getExercises = async () => {
    const { data } = await axios.get(
      'https://fitquestapp.herokuapp.com/api/routines'
    );
    setRoutine(data);
  };

  const getSingleRoutine = async (id) => {
    const { data } = await axios.get(
      `https://fitquestapp.herokuapp.com/api/routines/${id}`
    );
    setSingleRoutine(data);
    console.log('data :>> ', data);
    console.log('singleExercise :>> ', singleRoutine);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let foundUser = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      foundUser = JSON.parse(foundUser);

      if (foundUser) {
        setUserToken(userToken);
        setUserInfo(foundUser);
      }

      setIsLoading(false);
    } catch (e) {
      console.log('is logged in error: ', e);
    }
  };

  const getRoutines = async () => {
    const routine = await axios.get(
      'https://fitquestapp.herokuapp.com/api/routines'
    );
    setRoutine(routine.data);
  };

  useEffect(() => {
    isLoggedIn();
    getRoutines();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, signUp, routine }}
    >
      {children}
    </AuthContext.Provider>
  );
};
