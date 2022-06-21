import { makeAutoObservable, observable, action } from 'mobx';
import instance from './instance';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStore {
  user = null;
  constructor() {
    makeAutoObservable(this);
  }

  signup = async (userData) => {
    try {
      const response = await instance.post('/signup', userData);
      const decoded = jwt_decode(response.data);
      const jsonValue = JSON.stringify(decoded);
      await AsyncStorage.setItem('myToken', jsonValue);
      instance.defaults.headers.common.Authorization = `Bearer ${response.data}`;
      this.user = decoded;
    } catch (error) {
      console.log("signup",error)
    }
  };

  signin = async (userData) => {
    try {
      const response = await instance.post('/signin', userData);
      this.setUser(response.data);
    } catch (error) {
      console.log("signin",error)
    }
  };

  setUser = async (token) => {
    const jsonValue = JSON.stringify(token)
    await AsyncStorage.setItem('myToken', jsonValue)
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    const decoded = jwt_decode(token);
    this.user = decoded;
  };

  signout = () => {
    delete instance.defaults.headers.common.Authorization;
    AsyncStorage.removeItem('myToken');
    this.user = null;
  };

  checkForToken = async () => {
    const token = await AsyncStorage.getItem('myToken')
    if (token) {
      const currentTime = Date.now();
      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.signout();
      }
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
