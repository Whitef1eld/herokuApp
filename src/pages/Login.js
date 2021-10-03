import React, { useState } from "react";
import "./Login.css";
import { Redirect } from "react-router";

function Login({ wrongMessage, setWrongmessage, setLogedin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", //getting cookies
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const content = await response.json();
    setRedirect(true);
    setWrongmessage(content.message);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        {wrongMessage !== "" && (
          <h3 className="h3 mb-3 fw-normal">{wrongMessage}</h3>
        )}
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            minLength="6"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
      </form>
    </div>
  );
}

export default Login;
