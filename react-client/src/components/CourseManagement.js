import React, { useState, useEffect } from "react";
import axios from "axios";

function App(props) {
  const [screen, setScreen] = useState("auth");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/api/signin";
  const auth = async () => {
    try {
      const loginData = { auth: { email, password } };

      const res = await axios.post(apiUrl, loginData);

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");

      const res = await axios.get("/api/read_cookie");

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };

  const deleteCookie = async () => {
    try {
      await axios.get("api/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  if (screen === "auth") {
    return (
      <div className="App">
        <div>
          <label>Email: </label>
          <br />
          <input type="text" onChange={e => setEmail(e.target.value)} />
          <br />
          <label>Password: </label>
          <br />
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br />
          <button onClick={auth}>Login</button>
        </div>
      </div>
    );
  } else if (screen === "admin@admin.ca") {
    return (
      <div className="App">
        <p>amdin</p>
        <a href="/CreateCourse">CreateCourse</a>
        <button onClick={deleteCookie}>Log out</button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <p>user</p>

        <button onClick={deleteCookie}>Log out</button>
      </div>
    );
  }
}

export default App;
