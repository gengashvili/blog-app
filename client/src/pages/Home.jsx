import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getPosts } from "../api";
import { UserContext } from "../UserContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    navigate("/create-post");
  };


  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <p>Author: {post.author}</p>
          <p>Created At: {post.createdAt}</p>
        </div>
      ))}
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
}
