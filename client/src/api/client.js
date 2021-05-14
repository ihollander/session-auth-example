// TODO: refactor reusable fetch code

async function login(formData) {
  const response = await fetch("/api/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}

async function signup(formData) {
  const response = await fetch("/api/signup", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}

async function me() {
  const response = await fetch("/api/me", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw data;
  }
}

export { login, signup, me };
