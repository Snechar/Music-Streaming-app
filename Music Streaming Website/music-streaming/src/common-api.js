import axios from "axios";
import Cookie from "js-cookie"

const url = process.env.NEXT_PUBLIC_API_URL || "https://localhost:44348";
const url2 = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const httpdefault = () => {
  return axios.create({
    baseURL: url + "/api",
    headers: {
      "Content-type": "application/json",
    },
  });
};
const httptoken = () => {
  const token = Cookie.get("token");
  return axios.create({
    baseURL: url + "/api",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
const httpupload = () => {
  return axios.create({
    baseURL: url2,
  });
};

export default {
  httpdefault,
  httptoken,
  httpupload,
};