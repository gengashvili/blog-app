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
    <main className="flex flex-col">
      <h2 className="mx-auto my-4 text-4xl w-fit">Recent Blogs</h2>
      {user && <button className="p-2 mx-auto my-2 text-2xl text-white bg-green-700 rounded-lg w-fit" onClick={() => navigate("/create-post")}>Create a post</button>}
      {posts.slice().reverse().map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
    </main>
  );
}
