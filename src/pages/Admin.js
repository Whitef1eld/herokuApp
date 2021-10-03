import React, { useState } from "react";
import { Redirect } from "react-router";

const Admin = ({
  name2,
  lastname2,
  email2,
  setName,
  setLastname,
  setEmail,
}) => {
  const [name1, setName1] = useState("");
  const [lastname1, setLastname1] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    let data = {
      name: name1,
      lastname: lastname1,
      email: email1,
      password: password1,
    };
    console.log(name1, lastname1, email1, password1);
    const response = await fetch("https://heroku-backend-nanda.herokuapp.com:8080/api/admin", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(
        /* name: name1,
        lastname: lastname1,
        email: email1,
        password: password1, */
        data
      ),
    });
    const content = await response.json();
    console.log(content.message);
    setName1("");
    setLastname1("");
    setEmail1("");
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">
          Name: <strong>{name2}</strong>
        </li>
        <li className="list-group-item">
          Lastname: <strong>{lastname2}</strong>
        </li>
        <li className="list-group-item">
          Email: <strong>{email2}</strong>
        </li>
      </ul>
      <form onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Edit personal information</h1>
        <h5 className="h5 mb-3 fw-normal">
          Input new informations you want to change
        </h5>
        <h5 className="h5 mb-3 fw-normal">
          **Change the fields you would like to edit. All fields must be filled.
          Password is required. If you want to set a new password, simply submit
          this form with new password!
        </h5>
        <h5 className="h5 mb-3 fw-normal">
          ***You will need to logout and login back again to update your info!
        </h5>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="New name"
            required
            onChange={(e) => setName1(e.target.value)}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="New lastname"
            required
            onChange={(e) => setLastname1(e.target.value)}
          />
          <label htmlFor="floatingInput">Lastname</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail1(e.target.value)}
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
            onChange={(e) => setPassword1(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>{" "}
    </div>
  );
};

export default Admin;
