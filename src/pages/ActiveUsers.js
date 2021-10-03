import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ActiveUsers() {
  const [question, setQuestion] = useState([]);
  const [loadmore, setLoadmore] = useState(20);
  
  useEffect(() => {
    (async () => {
      const response = await fetch("https://heroku-backend-nanda.herokuapp.com/api/active-users", {
        headers: { "Content-Type": "application/json" },
      });
      const content = await response.json()
      console.log(content)
      setQuestion(content)
    })()
    /* return () => {
      setQuestion([])
    } */
  }, [])
  const onLoadMore = () => {
    setLoadmore(loadmore + 5);
  };
  return (
    <Fragment>
      <h2>
        <Link to="/">Home Page </Link> &nbsp;|&nbsp; <Link to='/hot-questions' >🔥 Hot Questions </Link>
        &nbsp;|&nbsp; 💯 Most active users
      </h2>
      <ul>
      {question.sort((a,b) => { return b.thumbsup - a.thumbsup}).slice(0, loadmore).map((q) => {
          return (
            
            <li key={q.id}>
              <p className='question'  ><strong>Name: &nbsp;</strong>{q.name}</p>
              <p className='thumbsup'  ><strong>{q.answers} &nbsp;Answers</strong></p>
            </li>
          );
        })}
        <a href="#/" onClick={onLoadMore}>
          Load More
        </a>
      </ul>
    </Fragment>
  );
}

export default ActiveUsers;
