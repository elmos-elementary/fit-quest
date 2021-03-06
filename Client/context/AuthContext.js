import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [singleRoutine, setSingleRoutine] = useState(null);
  const [user, setUser] = useState(null);
  const [sessionExercise, setSessionExercise] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [singleSession, setSingleSession] = useState([]);
  const [currentOpponent, setCurrentOpponent] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [updateItems, setUpdateItems] = useState([]);
  const [summary, setSummary] = useState(null);

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

      setUser(user.data);
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
      setUser(user.data);

      setIsLoading(false);
      return user;
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = async (token) => {
    try {
      setIsLoading(true);
      axios.defaults.headers.common['Authorization'] = token;
      const { data } = await axios.get(
        'https://fitquestapp.herokuapp.com/api/auth/me'
      );
      setUser(data);

      setIsLoading(false);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const confirmUserEmail = async (email) => {
    try {
      const { data } = await axios.put(
        'https://fitquestapp.herokuapp.com/api/users/email',
        { email }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const confirmUser = async (email, password) => {
    try {
      const { data } = await axios.put(
        'https://fitquestapp.herokuapp.com/api/users/check',
        { email, password }
      );
      return data;
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

  const getSingleRoutine = async (userId, routineId) => {
    try {
      await axios.post(
        `https://fitquestapp.herokuapp.com/api/sessions/start/${userId}`,
        { date: new Date(), routineId }
      );

      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/sessions/current/${userId}`
      );
      data.sessionExercises.sort((a, b) => a.exerciseId - b.exerciseId);

      setSingleRoutine(data);

      const user = await axios.get(
        `https://fitquestapp.herokuapp.com/api/users/${userId}`
      );
      setUser(user.data);

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

      if (data.sessionExercises) {
        data.sessionExercises.sort((a, b) => a.exerciseId - b.exerciseId);
      }

      setSingleRoutine(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const completeSession = async (id) => {
    try {
      const { data } = await axios.put(
        `https://fitquestapp.herokuapp.com/api/sessions/complete/${id}`
      );
      setSummary(data);
      getCurrentOpponent(id);
      getUserItems(user.id);
      getAllItems();
    } catch (err) {
      console.error(err);
    }
  };

  const getUserAfterComplete = async (id) => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/users/${id}`
      );
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateSessionExercise = async (id, obj) => {
    try {
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
      data.sort((a, b) => b.id - a.id);
      setUserHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentOpponent = async (userId) => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/opponents/current/${userId}`
      );
      setCurrentOpponent(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getExerciseHistory = async (userId, exerciseId) => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/sessionExercises/history/${userId}/${exerciseId}`
      );

      setExerciseHistory(data);

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const getSingleSession = async (id) => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/sessions/${id}`
      );

      setSingleSession(data);
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

      if (foundUser) {
        await setUserToken(userToken);
        await setUserInfo(foundUser);
        await getUser(userToken);
      }

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserItems = async (id) => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/items/user/${id}`
      );
      setUserItems(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const getAllItems = async () => {
    try {
      const { data } = await axios.get(
        `https://fitquestapp.herokuapp.com/api/items/`
      );
      setAllItems(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserItems = async (userId, itemId) => {
    try {
      const { data } = await axios.put(
        `https://fitquestapp.herokuapp.com/api/items/equip/${userId}/${itemId}`
      );
      setUpdateItems(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const unequipUserItem = async (userId, slotName) => {
    try {
      const { data } = await axios.put(
        `https://fitquestapp.herokuapp.com/api/items/unequip/${userId}/${slotName}`
      );
    } catch (err) {
      console.error(err);
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
        currentOpponent,
        getCurrentOpponent,
        getExerciseHistory,
        exerciseHistory,
        getSingleSession,
        singleSession,
        getUserItems,
        userItems,
        updateUserItems,
        getUserAfterComplete,
        confirmUserEmail,
        confirmUser,
        summary,
        unequipUserItem,
        getAllItems,
        allItems,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
