import React from "react";
import { Link } from "react-router-dom";
import * as client from "../api/client";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    client
      .logout()
      .then(() => setUser(null))
      .catch((err) => console.log(err));
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
