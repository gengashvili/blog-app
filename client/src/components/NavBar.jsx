import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function NavBar() {
  const { user, updateUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    updateUser(null);
  };

  return (
    <header className="py-4 bg-gray-800">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <h1 className="text-2xl font-bold text-white">
          <Link to="/" className="text-white hover:text-gray-300">
            blog app
          </Link>
        </h1>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-4"
                title="see profile details"
              >
                <p className="text-white hover:text-gray-300">
                  {user.username}
                </p>
                <img className="w-10" src={user.image} alt="user profile" />
              </Link>
              <p
                className="text-white cursor-pointer hover:text-gray-300"
                onClick={handleLogout}
              >
                Log Out
              </p>
            </div>
          ) : (
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
          )}
        </nav>
      </div>
    </header>
  );
}
