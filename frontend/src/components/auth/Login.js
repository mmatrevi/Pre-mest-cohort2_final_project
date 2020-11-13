import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import "./SignUp.css";
import { useHistory } from "react-router-dom";
import Nav from "../Nav";
import axios from "axios";

function Login() {
  const history = useHistory();

  function Logoutfunction(event) {
    history.push("/");
  }

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const { setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    const loginUser = { userName, password };
    const LoginRes = await axios.post(
      "http://localhost:4000/users/login",
      loginUser
    );

    localStorage.setItem("auth-token", LoginRes.data.token);
    history.push("/");
    window.location.reload(true);
  };

  return (
    <div>
      <Nav />
      <center>
        <div className="container">
          <form onSubmit={submit}>
            <label>
              <h2>Signup</h2>
            </label>
            <label>
              <b>Username</b>
            </label>

            <input
              type="text"
              id="register-username"
              onChange={(e) => setuserName(e.target.value)}
              required
              placeholder="Enter Username"
            ></input>
            <br></br>

            <label>
              <b>Password</b>
            </label>

            <input
              type="password"
              id="register-password"
              onChange={(e) => setpassword(e.target.value)}
              required
              placeholder="Enter Password"
            ></input>
            <br></br>

            <button type="submit" value="register">
              SignUp
            </button>

            <button
              type="button"
              className="cancelbtn"
              onClick={Logoutfunction}
            >
              Cancel
            </button>
            <br></br>
          </form>
        </div>
      </center>
    </div>
  );
}

export default Login;
