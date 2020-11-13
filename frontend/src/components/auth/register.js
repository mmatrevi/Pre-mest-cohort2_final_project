import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import "./SignUp.css";
import { useHistory } from "react-router-dom";
import Nav from "../Nav";
import axios from "axios";

function SignUp() {
  const history = useHistory();

  function Logoutfunction(event) {
    history.push("/");
  }

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const { setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    const newUser = { userName, password, phoneNumber };
    await axios.post("http://localhost:4000/users/register", newUser);
    const loginRes = await axios.post("http://localhost:4000/users/login", {
      userName,
      password,
    });

    localStorage.setItem("auth-token", loginRes.data.token);
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
              <b>Phone No:</b>
            </label>

            <input
              type="text"
              id="register-phonenumber"
              onChange={(e) => setphoneNumber(e.target.value)}
              required
              placeholder="Enter Phone number"
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

export default SignUp;
