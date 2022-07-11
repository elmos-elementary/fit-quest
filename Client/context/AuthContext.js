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
  const [sessionExercise, setSessionExercise] = useState(null);
  const [userHistory, setUserHistory] = useState(null);

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
      await axios.post(
        `https://fitquestapp.herokuapp.com/api/sessions/start/${userId}`,
        { date: new Date(), routineId }
      );

      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/sessions/current/${userId}`
      );
      data.sessionExercises.sort((a, b) => a.exerciseId - b.exerciseId);

      setSingleRoutine(data);

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const getSessionExercise = async (id) => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/sessionexercises/${id}`
      );
      setSessionExercise(data);

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const getSession = async (userId) => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/sessions/current/${userId}`
      );
     
      data.sessionExercises.sort((a, b) => a.exerciseId - b.exerciseId);
      setSingleRoutine(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const completeSession = async (id) => {
    try {
      console.log('in complete session');
      const { data } = await axios.put(
        `https://fitquestapp.herokuapp.com/api/sessions/complete/${id}`
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const updateSessionExercise = async (id, obj) => {
    try {
      console.log('in update session exercise');
      const { data } = await axios.put(
        `https://fitquestapp.herokuapp.com/api/sessionExercises/${id}`,
        obj
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const getUserHistory = async (id) => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/sessions/all/${id}`
      );
      // data.sort((a, b) => a.date - b.date);

      setUserHistory(data);

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
        getSessionExercise,
        sessionExercise,
        getUserHistory,
        userHistory,
        completeSession,
        updateSessionExercise,
        getSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
