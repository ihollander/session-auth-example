import axios from "axios";

axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;

function logout() {
  return axios.delete("/api/logout");
}

function login(formData) {
  return axios.post("/api/login", formData);
}

function signup(formData) {
  return axios.post("/api/signup", formData);
}

function me() {
  return axios.get("/api/me");
}

function updateProfile(formData) {
  return axios.patch("/api/me", formData);
}

export { logout, login, signup, me, updateProfile };
