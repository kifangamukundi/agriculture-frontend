import axios from "axios";
// change the base url to production url
// "REACT_APP_API_PATH_PRODUCTION"
const BASE_URL = process.env.REACT_APP_API_PATH;
console.log(BASE_URL);
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
