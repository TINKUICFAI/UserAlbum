import React, { useState, useEffect } from "react";
import axios from "axios";
function Profile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        "https://three-points.herokuapp.com/api/users/6136944fcd79ba24707e2f82",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.status === 401) {
          window.localStorage.clear();
          window.location.href = "/login";
        } else {
          const user = res.data;
          setUser(user);
        }
      })
      .catch((err) => {
        window.localStorage.clear();
        window.location.href = "/login";
      });
  });

  return (
    <div className="user-div">
      <img className="user-logo" src={user.avatar} alt={"user"} />
      <br></br>
      <br></br>
      <h4>@{user.name}</h4>
      <br></br>
      <p>{user.bio}</p>
    </div>
  );
}

export default Profile;
