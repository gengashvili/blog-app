import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../api";
import { dateFormater } from "../utils";
import { UserContext } from "../UserContext";

export default function Post() {
  const [post, setPost] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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

  const deletePostHandler = () => {
    deletePost(id)
      .then((message) => {
        console.log(message);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="w-11/12 max-w-4xl p-4 mx-auto mb-4 bg-white rounded-lg shadow-md">
      {post ? (
        <>
          <h2 className="mx-auto my-4 text-4xl font-bold w-fit">
            {post.title}
          </h2>
          <div className="flex justify-center gap-4 my-2 text-base">
            <p>author: {post.author.username}</p>
            <p>create at: {formattedDate}</p>
          </div>
          <img src={post.image} alt={post.title} className="w-11/12 mx-auto" />
          <h3 className="w-10/12 mx-auto my-3 text-2xl font-medium">
            {post.summary}
          </h3>
          <p
            className="w-10/12 mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {user?.username === post.author.username ? (
            <div className="flex justify-center gap-4">
              <button
                className="p-1 text-white bg-green-700 rounded-md"
                onClick={() => navigate(`/update-post/${id}`)}
              >
                Edit Post
              </button>
              <button
                className="p-1 text-white bg-red-700 rounded-md"
                onClick={deletePostHandler}
              >
                Delete Post
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <p>post data is loading</p>
      )}
    </main>
  );
}
