import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import MyQuestions from "./pages/MyQuestions";
import Questions from "./pages/Questions";
import HotQuestions from "./pages/HotQuestions";
import ActiveUsers from "./pages/ActiveUsers";
/* const endpoint = 'https://clipper-app-mop.herokuapp.com';
 */
function App() {
  const [logedin, setLogedin] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [id, setId] = useState(0)
  const [answers, setAnswers] = useState('')
  const [wrongMessage, setWrongmessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("https://heroku-backend-nanda.herokuapp.com/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      console.log(content.name, logedin);
      // eslint-disable-next-line eqeqeq
      if (wrongMessage == "success") {
        setLogedin(true);
        setName(content.name);
        setLastname(content.lastname);
        setEmail(content.email);
        setId(content.id)
        setAnswers(content.answers)
      }
    })();
  }, [logedin, wrongMessage]);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://heroku-backend-nanda.herokuapp.com/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      // eslint-disable-next-line eqeqeq
      if (typeof content.name !== 'undefined' && content.name !== "") {
        setLogedin(true);
        setName(content.name);
        setLastname(content.lastname);
        setEmail(content.email);
        setId(content.id)
        setAnswers(content.answers)
      }
      console.log(content.id, content.name, logedin, 'message' + wrongMessage);
    })();
  });
  
  return (
    <Router>
      <div className="App">
        <Navbar
          logedin={logedin}
          setLogedin={setLogedin}
          setName={setName}
          name={name}
          setWrongmessage={setWrongmessage}
        />
        <div className="container">
          <div className="row">
            <h1 className="mt-3">Clipper App</h1>
            <h5 className="mt-3">Ask anything!</h5>
            <hr className="mb-3" />
          </div>

          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/questions">Question Page</Link>
                  </li>
                  {logedin && (
                    <div>
                      <li className="list-group-item">
                        <Link to="/my-questions">My Questions</Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/admin">My Profile</Link>
                      </li>
                    </div>
                  )}
                </ul>
              </nav>
            </div>

            <div className="col-md-10">
              <Switch>
                <Route
                  path="/"
                  exact
                  component={() => (
                    <Home logedin={logedin} setLogedin={setLogedin} />
                  )}
                ></Route>
                <Route
                  path="/login"
                  component={() => (
                    <Login
                      wrongMessage={wrongMessage}
                      setLogedin={setLogedin}
                      setWrongmessage={setWrongmessage}
                    />
                  )}
                />
                <Route path="/register" component={Register}></Route>
                <Route
                  path="/admin"
                  component={() => (
                    <Admin
                      name2={name}
                      lastname2={lastname}
                      email2={email}
                      setName={setName}
                      setLastname={setLastname}
                      setEmail={setEmail}
                    />
                  )}
                ></Route>
                <Route exact path='/hot-questions' component={()=><HotQuestions />} />
                <Route exact path='/most-active-users' component={()=><ActiveUsers />} />
                <Route path="/questions" component={() => <Questions id3={id} name3={name} lastname3={lastname} email3={email} answers3={answers} logedin={logedin} />} />
                <Route path="/my-questions" component={()=><MyQuestions id={id}/>} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      )
    </Router>
  );
}

export default App;
