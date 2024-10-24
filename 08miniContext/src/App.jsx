import React from "react";
import UserContextProvider from "./Context/userContextProvider";
import Login from "./Components/Login";
import Profile from "./Components/Profile";

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <h1>Learn Context API</h1>
        <Login />
        <Profile />
      </div>
    </UserContextProvider>
  );
}

export default App;
