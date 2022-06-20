import axios from "axios";

const instance = axios.create({
  //Don't Write Localhost
  baseURL: "YourIp:8000",
});

export default instance;
