import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../api";
import { UserContext } from "../UserContext";
import PostCard from "../components/PostCard";

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

  return (
    <main className="">
      <h1>Posts</h1>
      {posts.slice().reverse().map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      <button onClick={() => navigate("/create-post")}>Create Post</button>
    </main>
  );
}
