import axios from "axios";
import Cookie from "js-cookie"

const url = process.env.NEXT_PUBLIC_API_URL || "https://localhost:44348";

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

export default {
  httpdefault,
  httptoken,
};