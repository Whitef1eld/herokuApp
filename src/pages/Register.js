import React, { useState } from "react";
import { Redirect } from "react-router";


function Register() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        lastname,
        email,
        password,
      }),
    });

    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <form onSubmit={submitHandler}>
      <h1 className="h3 mb-3 fw-normal">Please register</h1>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="floatingInput">Name</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          placeholder="Lastname"
          required
          onChange={(e) => setLastname(e.target.value)}
        />
        <label htmlFor="floatingInput">Lastname</label>
      </div>
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
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
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

export default Register;
