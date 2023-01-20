
export async function rememberMe(username: string, password: String, checked: boolean) {
  const usernameSaved = localStorage.getItem("USERNAME");
  const passwordSaved = localStorage.getItem("PASSWORD");
  const checkedSaved = localStorage.getItem("CHECKED");
  const check = (checkedSaved === "true");

  return {
    usernameSaved,
    passwordSaved,
    check,
  }
}