import { Link } from "react-router-dom";
import { dateFormater } from "../utils";

export default function PostCard({ post }) {
  const formattedDate = dateFormater(post.createdAt);
  
  return (
    <article className="flex flex-col w-11/12 max-w-4xl p-4 mx-auto mb-4 bg-white rounded-lg shadow-md sm:flex-row">
      <div className="w-full mb-4 sm:w-1/2 ">
        <img src={post.image} alt="Post" className="w-full max-h-60" />
      </div>
      <div className="w-full pl-4 sm:w-1/2">
        <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
        <p className="text-gray-700">author: {post.author.username}</p>
        <p className="text-gray-700">Created at: {formattedDate}</p>
        <p className="mb-2 text-gray-700">{post.summary}</p>
        <Link className="p-2 mt-1 text-xl text-white bg-green-700 rounded-lg" to={`/post/${post._id}`}>read more detail</Link>
      </div>
    </article>
  );
}
