import axios from "axios";

const instance = axios.create({
  //Don't Write Localhost
  baseURL: "http://192.168.8.131:8000",
});

export default instance;
