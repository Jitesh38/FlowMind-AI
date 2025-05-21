import { useNavigate } from "react-router";
import { useUser } from "../context/UserContextProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white">
      <NavLink to={"/"}>
        <div className="text-2xl font-bold cursor-pointer">FlowMind AI</div>
      </NavLink>
      <div className="flex gap-4">
        {!user ? (
          <>
            <button
              className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors"
              onClick={() => navigate("signin")}
            >
              Sign In
            </button>
            <button
              className="border border-blue-500 text-blue-400 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
              onClick={() => navigate("signup")}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              className="border border-blue-500 text-blue-400 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
              onClick={() => signOut(auth).then(() => setUser(null))}
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
