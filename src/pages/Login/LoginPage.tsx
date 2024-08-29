import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import useApiService from "../../services/ApiService";

function LoginPage() {
  const { setIsAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useApiService();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await login({ username, password }).then(() => {
        setIsAuthenticated(true);
      });
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
    }
  };
  return (
    <div className="page login">
      <form action="" className="login__form" onSubmit={handleSubmit}>
        <div className="login__part">
          <label htmlFor="login">Login</label>
          <input
            className="login__input"
            type="text"
            placeholder="login"
            id="login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login__part">
          <label htmlFor="password">Password</label>
          <input
            className="login__input"
            type="password"
            placeholder="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input className="login__btn" type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default LoginPage;
