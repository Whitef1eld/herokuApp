import React, { Fragment, useState, useEffect } from "react";

const MyQuestions = ({ id }) => {
  const [question, setQuestion] = useState([]);
  /*   const [manage, setManage] = useState(true);
   */ const [loadmore, setLoadmore] = useState(20);

  /* const changeManage = () => {
    setManage(!manage);
  }; */
  useEffect(() => {
    (async () => {
      const response = await fetch("https://heroku-backend-nanda.herokuapp.com:8080/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      console.log(content.questions);
      setQuestion(content.questions);
    })();
  }, []);
  const onLoadMore = () => {
    setLoadmore(loadmore + 5);
  };
  return (
    <Fragment>
      <h2>My Questions</h2>
      <ul>
        {question
          .sort((a, b) => {
            return b.id - a.id;
          })
          .slice(0, loadmore)
          .map((q) => {
            return (
              <li key={q.id}>
                <div className="border">
                  <p className="question"><strong>Question: &nbsp;</strong>{q.question}</p>
                  <p className="thumbsup"><strong>👍 &nbsp;{q.thumbsup}&nbsp;Likes</strong></p>
                </div>
                {/* {q.answers.map((a) => {
              return <p key={a}>{a}</p>;
            })} */}
              </li>
            );
          })}
        <a href="#/my-questions" onClick={onLoadMore}>
          Load More
        </a>
      </ul>
    </Fragment>
  );
};

export default MyQuestions;
