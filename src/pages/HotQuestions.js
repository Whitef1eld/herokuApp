import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css'
/* const endpoint = 'https://clipper-app-mop.herokuapp.com';
 */
const HotQuestions = () => {
    const [question, setQuestion] = useState([])
  const [manage, setManage] = useState(true);
  const [loadmore, setLoadmore] = useState(20)
  const changeManage = () => {
    setManage(!manage);
  };
 /*  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/questions", {
        headers: { "Content-Type": "application/json" },
      });
      const content = await response.json()
      console.log(content)
      setQuestion(content)
    })()
    return () => {
      setQuestion([])
    }
  }, []) */

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8080/api/questions", {
        headers: { "Content-Type": "application/json" },
      });
      const content = await response.json()
      console.log(content)
      setQuestion(content)
    })()
    /* return () => {
      setQuestion([])
    } */
  }, [manage])
  
  const questionHandler = async (q, e) => {
    e.preventDefault()
    await fetch("http://localhost:8080/api/thumbsup",{
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
      <h2><Link to='/'>Home Page </Link> &nbsp;|&nbsp; 🔥 Hot Questions &nbsp;|&nbsp; <Link to='/most-active-users'>💯 Most active users </Link></h2>
      <ul>
        {question.sort((a,b) => { return b.thumbsup - a.thumbsup}).slice(0, loadmore).map((q) => {
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



export default HotQuestions
