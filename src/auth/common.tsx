export function storeTokenInLocalStorage(token: string): void {
  localStorage.setItem("token", token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}
