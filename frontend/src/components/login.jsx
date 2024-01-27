import React, { useState } from "react";
import axios from "axios";
function Login() {
  const [error, setError] = useState(false);
  const [data] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function setEmails(email) {
    setEmail(email);
  }

  function setPassword(psw) {
    setPass(psw);
  }

  function onLoginComplete() {
    if (email !== "" && pass !== "") {
      axios
        .post(
          "https://three-points.herokuapp.com/api/login",
          {
            username: email,
            password: pass,
          },
          {
            timeout: 2000,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            window.location.href = "/";
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          setError(true);
        });
    } else {
      alert("Rellena todos los campos");
    }
  }

  return (
    <div className="login-div">
      {error === true && (
        <div className="error-msg">Email o Contraseña incorrecto</div>
      )}
      <label>Email</label>
      <br></br>
      <input
        onChange={(event) => setEmails(event.target.value)}
        className="input-login"
        type="text"
      ></input>
      <br></br>
      <label>Password</label>
      <br></br>
      <input
        onChange={(event) => setPassword(event.target.value)}
        className="input-login"
        type="password"
      ></input>
      <br></br>
      <button onClick={onLoginComplete} className="btn btn-primary">
        Login
      </button>
      <h1>{data}</h1>
    </div>
  );
}

export default Login;
