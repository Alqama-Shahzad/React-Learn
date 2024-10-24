import React, { useContext } from "react";
import UserContext from "../Context/userContext";

function Profile() {
  const { user } = useContext(UserContext);
    
  if (!user) return <div className="error">Please Login</div>;

  return <div className="welcome">Welcome, {user.username}!</div>;
}

export default Profile;
