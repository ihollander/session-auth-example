async function request(endpoint, options = {}) {
  const response = await fetch(endpoint, {
    ...options,
    credentials: "include",
  });
  let data;
  // try/catch in case data is not valid JSON (or no content)
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  if (response.ok) {
    // for good status codes, return the parsed data
    return data;
  } else {
    // for bad status codes, throw the data to .catch
    throw data;
  }
}

function logout() {
  return request("/api/logout", {
    method: "DELETE",
  });
}

function login(formData) {
  return request("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

function signup(formData) {
  return request("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

function me() {
  return request("/api/me");
}

function updateProfile(formData) {
  return request("/api/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

export { logout, login, signup, me, updateProfile };
