import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api";
import { dateFormater } from "../utils";

export default function Post() {
  const [post, setPost] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && post.createdAt) {
      const formattedDate = dateFormater(post.createdAt);
      setFormattedDate(formattedDate);
    }
  }, [post]);

  return (
    <main className="bg-white rounded-lg shadow-md p-4 mb-4 w-11/12 max-w-4xl mx-auto text-center">
      {post ? (
        <>
          <h2 className="text-4xl font-bold my-4">{post.title}</h2>
          <div className="flex">
            <p>author: {post.author.username}</p>
            <p>create at: {formattedDate}</p>
          </div>
          <img src={post.image} alt={post.title} className="mx-auto w-2/3" />
          <h3 className="text-2xl font-medium">{post.summary}</h3>
          <p className="text-base">{post.content}</p>
        </>
      ) : (
        <p>post data is loading</p>
      )}
    </main>
  );
}
