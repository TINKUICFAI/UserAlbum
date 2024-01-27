import React, { useState } from "react";
function Post(props) {
  let [likes, setLikes] = useState(parseInt(props.likes));
  let [state, setStates] = useState(0);

  function changeLike() {
    let countLike = 0;
    if (state === 0) {
      countLike = likes += 1;
      setStates(1);
    } else {
      countLike = likes -= 1;
      setStates(0);
    }
    setLikes(countLike);
  }

  return (
    <div className="card-div">
      <img className="img-grid" src={props.image}></img>
      <div className="card-cont align-left">
        <button
          onClick={changeLike}
          className={`${state === 0 ? "like-btn" : "no-like-btn"}`}
        >
          <i className="fa-solid fa-heart"></i>
          {likes}
        </button>
        <p>{props.time} days ago</p>
        <p>@{props.user}</p>
        <p className="desc">{props.title}</p>
        <p className="pointer">
          <i className="fa-regular fa-message"></i>Comments ({props.comments})
        </p>
        <div className="comment-1 hide"></div>
      </div>
    </div>
  );
}

export default Post;
