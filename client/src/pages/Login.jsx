import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { UserContext } from "../UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      setErrorMessage(false);
      const { token } = response;
      updateUser(response.user);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
    }
  };

  return (
    <main className="form-wrapper">
      <h1 className="form-heading">Login</h1>
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="form-btn">
          Login
        </button>
      </form>
    </main>
  );
}
