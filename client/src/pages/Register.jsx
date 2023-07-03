import { useState } from "react";
import { registerUser } from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleImageChange = async (e) => {
    const file = await e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(username, password, image);
      setErrorMessage(false);
      const { token } = response;
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
    }
  };
  return (
    <main className="flex flex-col items-center justify-center my-10">
      <h1 className="mb-4 text-2xl font-bold">Register</h1>
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
            className="register-input"
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
            className="register-input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1">
            Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="register-btn"
        >
          Register
        </button>
      </form>
    </main>
  );
}
