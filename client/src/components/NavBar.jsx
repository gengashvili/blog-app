import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="py-4 bg-gray-800">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <h1 className="text-2xl font-bold text-white">
          <Link to="/" className="text-white hover:text-gray-300">
            blog app
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
