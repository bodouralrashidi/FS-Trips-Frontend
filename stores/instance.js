import axios from "axios";

const instance = axios.create({
  //Don't Write Localhost
  baseURL: "http://192.168.0.98:8000",
});

export default instance;
