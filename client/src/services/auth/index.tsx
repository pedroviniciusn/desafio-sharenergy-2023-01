
export function isAuthenticated() {
  if(!localStorage.getItem("TOKEN_KEY")) {
    return false
  }
};

export const getToken = () => localStorage.getItem("TOKEN_KEY");

export const login = (token: string) => {
  localStorage.setItem("TOKEN_KEY", token);
};

export const logout = () => {
  localStorage.removeItem("TOKEN_KEY");
};