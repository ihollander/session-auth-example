import React, { useState } from "react";
import * as client from "../api/client";

function Profile({ user, setUser }) {
  const [username, setUsername] = useState(user.username);

  function handleSubmit(e) {
    e.preventDefault();
    client
      .updateProfile({ username })
      .then(setUser)
      .catch((err) => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{user.username}'s Profile</h1>

      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button type="submit">Update Profile</button>
    </form>
  );
}

export default Profile;
