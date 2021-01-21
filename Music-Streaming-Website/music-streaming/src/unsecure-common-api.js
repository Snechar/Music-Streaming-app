import axios from "axios";
import Cookie from "js-cookie"

const url = process.env.NEXT_PUBLIC_API_URL || "https://localhost:44343";

const httpdefault = () => {
  const https = require("https");
  return axios.create({
    baseURL: url + "/api",
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
};

const httptoken = () => {
  const token = Cookie.get("token");
  const https = require("https");
  return axios.create({
    baseURL: url + "/api",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
};

export default {
  httpdefault,
  httptoken,
};
