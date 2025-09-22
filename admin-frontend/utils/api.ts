import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true // send cookies to backend
});

export default API;
