import http from "../http-common";

const Login = (data) => {
    return http.post("/authenticate/login", data);
  };
  
  const Register = (data) => {
    return http.post("/authenticate/register", data);
  };

  export default {
    Login,
    Register,
  };
  