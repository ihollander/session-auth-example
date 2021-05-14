import React, { useState } from "react";

function Profile({ user, setUser }) {
  const [username, setUsername] = useState(user.username);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Updating profile", { username });
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
