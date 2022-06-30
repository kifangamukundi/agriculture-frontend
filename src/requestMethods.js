import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";
let TOKEN = ""

if ("persist:root" in localStorage) {
  TOKEN = JSON.parse(JSON.parse(localStorage?.getItem("persist:root"))?.users)?.currentUser?.accessToken;
} else {
  TOKEN = {}
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 'x-access-token': `${TOKEN}` },
});
