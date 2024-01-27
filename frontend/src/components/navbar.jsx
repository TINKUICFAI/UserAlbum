import React from "react";
import {
 useNavigate
} from "react-router-dom";

  function Navbar() {
    let navigate = useNavigate();
    return (
      <header>
        <div className="row">
          <div className="col-10 align-left">
            <a
              className="pointer"
              onClick={() => 
              navigate("/")}
            >
              <i className="fa-brands fa-twitter"></i>
              Three pics
            </a>
          </div>
          <div className="col-2 align-right">
            <i
              onClick={() => 
              navigate("/profile")}
              className="fa-solid fa-user-ninja pointer"
            ></i>
          </div>
        </div>
      </header>
    );
  }

export default Navbar;
