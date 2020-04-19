import React from "react";
import logo from "../images/logo.png";
import back from "../images/Background.png";
import { Form } from '../components/Form';
import { useAuth } from "../providers/auth-provider";

function Login() {
  const { login } = useAuth();

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password"
    }
  ];

  // handleLogin = () => {
  //   // setError(null);

  //   axios({
  //     method: 'post',
  //     url: '/.netlify/functions/login',
  //     headers: {
  //       accept: 'Accept: application/json',
  //     },
  //     data: {
  //       "email": this.state.email,
  //       "password": this.state.password
  //     }
  //   })
  //     .then(response => {
  //       // setUserSession(response.data.token, response.data.user);
  //       console.log(response.data);

  //     })
  //     .catch(error => {
  //       // if (error.response.status === 401) setError(error.response.data.message);
  //       // else setError("Something went wrong. Please try again later.");
  //       console.log(error)
  //     });
  // }


  return (
    <div className="login-box">
      <img src={back} alt="logo" className="login-back" />
      <div className="Login col-md-4 col-xs-12 col-lg-4 col-sm-8 m-auto">
        <div className="m-auto img-box"><img className="login-logo" src={logo} alt="semafore-logo" /><span>SemaFore</span></div>
        <Form title="Login" onSubmit={login} inputs={inputs} />
      </div>
    </div>
  );
}


export { Login };
