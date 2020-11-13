import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Content from "./components/Content";
import register from "./components/auth/register";
import Login from "./components/auth/Login";
import Gallery from "./components/Executive-Gallery";
import Creative from "./components/Creative-Gallery";
import Casual from "./components/Casual-Gallery";
import Summer from "./components/Summer-Gallery";
import Kids from "./components/Kids-Gallery";
import UserContext from "./context/UserContext";
import CallRequest from "./components/CallRequest";
import axios from "axios";

function App() {
  const [userData, setuserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:4000/users/tokenIsValid/",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:4000/users/", {
          headers: { "x-auth-token": token },
        });
        setuserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setuserData }}>
          <Switch>
            <Route exact path="/" component={Content} />
            <Route exact path="/register" component={register} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Executive-Gallery" component={Gallery} />
            <Route exact path="/Casual-Gallery" component={Casual} />
            <Route exact path="/Creative-Gallery" component={Creative} />
            <Route exact path="/Summer-Gallery" component={Summer} />
            <Route exact path="/Kids-Gallery" component={Kids} />
            <Route exact path="/CallRequest" component={CallRequest} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
