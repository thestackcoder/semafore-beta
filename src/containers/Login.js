import React from "react";
import logo from "../images/logo.png";
import back from "../images/Background.png";
import { Form } from '../components/Form';
import { useAuth, AuthProvider } from "../providers/auth-provider";

function Login() {
  const { login } = useAuth();

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      key: 1
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      key: 2
    }
  ];

  console.log(login);


  return (
    < div className="login-box" >
      <img src={back} alt="logo" className="login-back" />
      <div className="Login col-md-4 col-xs-12 col-lg-4 col-sm-8 m-auto">
        <div className="m-auto img-box"><img className="login-logo" src={logo} alt="semafore-logo" /><span>SemaFore</span></div>
        <div>{login}</div>
        <Form title="Login" onSubmit={login} inputs={inputs} />
      </div>
    </div >
  );
}


export { Login };
