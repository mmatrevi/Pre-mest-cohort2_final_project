import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Nav.css";
import UserContext from "../context/UserContext";

export default function Nav() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const onClickRegister = (event) => {
    event.preventDefault();
    history.push("/register");
  };

  const onClickLogin = () => {
    history.push("/Login");
  };

  const Logout = (event) => {
    event.preventDefault(false);
    localStorage.setItem("auth-token", "");
    window.location.reload(true);
    setUserData()
    history.push("/");
  };

  return (
    <nav className="top-nav">
      {userData.user ? (
        <>
          <div className="active">
            <b>
              <a href="/">Fashion Depot</a>
            </b>
          </div>
          <div className="SignUp" onClick={Logout}>
            Logout
          </div>
        </>
      ) : (
        <>
          <div className="active">
            <b>
              <a href="/">Fashion Depot</a>
            </b>
          </div>
          <div className="SignUp" onClick={onClickRegister}>
            SignUp
          </div>
          <div className="SignUp" onClick={onClickLogin}>
            Login
          </div>
        </>
      )}
    </nav>
  );
}
