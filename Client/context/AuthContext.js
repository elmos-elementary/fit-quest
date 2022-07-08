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
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      console.log('login ran');
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
      setUser(user.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async (email, password, firstName, lastName) => {
    try {
      console.log('signup ran');
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
      setUser(user.data);

      setIsLoading(false);
      return user;
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = async (token) => {
    try {
      console.log('getuser ran');
      setIsLoading(true);
      axios.defaults.headers.common['Authorization'] = token;
      const { data } = await axios.get(
        'https://fitquestapp.herokuapp.com/api/auth/me'
      );
      setUser(data);

      setIsLoading(false);
      return data;
    } catch (err) {
      console.log('error in getUser');
      console.error(err);
    }
  };

  const getRoutine = async () => {
    try {
      console.log('get routine ran');
      const { data } = await axios.get(
        'https://fitquestapp.herokuapp.com/api/routines'
      );

      setRoutine(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSingleRoutine = async (userId, routineId) => {
    try {
      console.log('get single routine ran');
      const { data } = await axios.post(
        `https://fitquestapp.herokuapp.com/api/sessions/start/${userId}`,
        { date: new Date(), routineId }
      );
      console.log('data is here', data);

      setSingleRoutine(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    try {
      console.log('logout ran');
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
      console.log('is logged in  ran');
      setIsLoading(true);
      let foundUser = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      foundUser = JSON.parse(foundUser);

      if (foundUser) {
        setUserToken(userToken);
        setUserInfo(foundUser);
        getUser(userToken);
      }

      setIsLoading(false);
    } catch (e) {
      console.log('is logged in error: ', e);
    }
  };

  useEffect(() => {
    // function fetchData() {
    //   AsyncStorage.getItem('userToken').then((response) => {
    //     getUser(response);
    //   });
    // }
    console.log('use effect ran');
    isLoggedIn();
    // fetchData();

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
        userInfo,
        user,
        getUser,
        getSingleRoutine,
        singleRoutine,
        getRoutine,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
