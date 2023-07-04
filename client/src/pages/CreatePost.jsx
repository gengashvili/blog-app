import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";
import { UserContext } from "../UserContext";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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
      const { _id: author } = user;
      await createPost(title, summary, image, content, author);
      setErrorMessage(false);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred");
    }
  };

  return (
    <main className="form-wrapper">
      <h2 className="form-heading">Create a New Post</h2>
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="summary" className="block mb-1">
            Summary:
          </label>
          <textarea
            id="summary"
            value={summary}
            required
            onChange={(e) => setSummary(e.target.value)}
            className="input"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-1">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            className="input"
          ></textarea>
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
        <button type="submit" className="form-btn">
          Create Post
        </button>
      </form>
    </main>
  );
}
