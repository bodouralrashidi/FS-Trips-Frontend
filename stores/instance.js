import axios from "axios";

const instance = axios.create({
  //Don't Write Localhost
  baseURL: "http://172.20.10.12:8000",
});

export default instance;
