import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css'
/* var questions = [
  {
    id:0,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbsup: 3,
    answers: ["first answer", "second answer"],
  },
  {
    id:1,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbsup: 5,
    answers: ["first answer", "second answer"],
  },
  {
    id:2,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbsup: 2,
    answers: ["first answer", "second answer", "third answer"],
  },
];
 */
/* const endpoint = 'https://clipper-app-mop.herokuapp.com';
 */
const Home = () => {
  const [question, setQuestion] = useState([])
  const [manage, setManage] = useState(true);
  const [loadmore, setLoadmore] = useState(20)
  const changeManage = () => {
    setManage(!manage);
  };
  useEffect(() => {
    (async () => {
      const response = await fetch("https://heroku-backend-nanda.herokuapp.com:8080/api/questions", {
        headers: { "Content-Type": "application/json" },
      });
      const content = await response.json()
      console.log(content)
      setQuestion(content)
    })()
    return () => {
      setQuestion([])
    }
  }, [manage])
  
  const questionHandler = async (q, e) => {
    e.preventDefault()
    await fetch("https://heroku-backend-nanda.herokuapp.com:8080/api/thumbsup",{
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: q,
      })
    })
    changeManage()
  }

  const onLoadMore = () => {
    setLoadmore(loadmore + 5)
  }
  return (
    <Fragment>
      <h2>Home Page &nbsp;|&nbsp; <Link to='/hot-questions'>🔥 Hot Questions</Link> &nbsp;|&nbsp; <Link to='/most-active-users'>💯 Most active users </Link></h2>
      <ul>
        {question.sort((a,b) => { return b.id - a.id}).slice(0, loadmore).map((q) => {
          return (
            
            <li key={q.id}>
              <div className="border" >
              <p className='question'  ><strong>Question: &nbsp;</strong>{q.question}</p>
              <p className='thumbsup' onClick={(e) => questionHandler(q.id, e)} ><strong>👍 &nbsp;{q.thumbsup}&nbsp;Likes</strong></p>
              </div>
              {/* {q.answers.map((a) => {
                return <p key={a}>{a}</p>;
              })} */}
            </li>
          );
        })}
        <a href='#/' onClick={onLoadMore}>Load More</a>
      </ul>
    </Fragment>
  );
};

export default Home;
