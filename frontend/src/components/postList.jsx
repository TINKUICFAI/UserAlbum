import Post from "./post";
import React, { useState, useEffect } from "react";
import axios from "axios";
function PostList(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://three-points.herokuapp.com/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 401) {
          window.localStorage.clear();
          window.location.href = "/login";
        } else {
          const poster = res.data;
          setPosts(poster);
        }
      })
      .catch((err) => {
        window.localStorage.clear();
        window.location.href = "/login";
      });
  });

  function getDateInterval(date) {
    var date1 = new Date(date);
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  const myCards = posts?.map(
    (dato, key) =>
      (dato.text.toLowerCase().includes(props.search.toLowerCase()) ||
        props.search === "") && (
        <div key={key} className="col-sm-6 col-lg-4 col-xl-3">
          <Post
            title={dato.text}
            time={getDateInterval(dato.createdAt)}
            user={dato.author.name}
            likes={dato.likes}
            comments={dato.comments.length}
            image={dato.image}
          />
        </div>
      )
  );

  return <div className="row align-center">{myCards}</div>;
}

export default PostList;
