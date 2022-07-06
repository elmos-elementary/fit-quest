import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    // await axios
    //   .post('http://192.168.0.102:8080/api/auth/login', { email, password })
    //   .then((res) => {
    //     let foundUser = res.data;
    //     setUserInfo(foundUser);
    //     setUserToken(foundUser.token);
    //     AsyncStorage.setItem('userInfo', JSON.stringify(foundUser));
    //     AsyncStorage.setItem('userToken', foundUser.token);

    //     return axios.get('http://192.168.0.102:8080/api/auth/me', {
    //       token: foundUser.token,
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(`Login error ${e}`);
    //   });

    const { data } = await axios.post(
      'http://192.168.0.102:8080/api/auth/login',
      { email, password }
    );
    let foundUser = data;
    setUserInfo(foundUser);
    setUserToken(foundUser.token);
    AsyncStorage.setItem('userInfo', JSON.stringify(foundUser));
    AsyncStorage.setItem('userToken', foundUser.token);
    // console.log(data.token);
    axios.defaults.headers.common['Authorization'] = foundUser.token;
    const user = await axios.get('http://192.168.0.102:8080/api/auth/me', {
      token: data.token,
    });
    // console.log('user :>> ', user.data);
    setIsLoading(false);
  };

  const signUp = async (email, password, firstName, lastName) => {
    setIsLoading(true);
    const { data } = await axios.post(
      'http://192.168.0.102:8080/api/auth/signup',
      { email, password, firstName, lastName }
    );
    let foundUser = data;
    console.log('data :>> ', data);
    AsyncStorage.setItem('userInfo', JSON.stringify(foundUser));
    AsyncStorage.setItem('userToken', foundUser.token);
    axios.defaults.headers.common['Authorization'] = foundUser.token;
    const user = await axios.get('http://192.168.0.102:8080/api/auth/me', {
      token: data.token,
    });
    // console.log('user.data :>> ', user.data);
    //TODO User needs to signup and then only be able to see the logged in user screens. Seems like it's not reading the token. Also needs to handle if
    //someone tries to signup with the same email address.
    setIsLoading(false);
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

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
