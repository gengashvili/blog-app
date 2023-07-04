import { Link } from "react-router-dom";
import { dateFormater } from "../utils";

export default function PostCard({ post }) {
  const formattedDate = dateFormater(post.createdAt);
  
  return (
    <article className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col sm:flex-row w-11/12 max-w-4xl mx-auto">
      <div className="w-full sm:w-1/2 mb-4 ">
        <img src={post.image} alt="Post" className="w-full max-h-60" />
      </div>
      <div className="w-full sm:w-1/2 pl-4">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700">author: {post.author.username}</p>
        <p className="text-gray-500">Created at: {formattedDate}</p>
        <p className="text-gray-700 mb-2">{post.summary}</p>
        <Link to={`/post/${post._id}`}>read more detail</Link>
      </div>
    </article>
  );
}
