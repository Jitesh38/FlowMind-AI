import { useNavigate } from "react-router";
import { useUser } from "../context/UserContextProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, todos } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white relative">
      <div className="flex items-center gap-4">
        <NavLink to={"/"}>
          <div className="text-2xl font-bold cursor-pointer">FlowMind AI</div>
        </NavLink>
        <div className="hidden md:flex flex-row gap-4">
          {todos && (
            <NavLink to={"tasks"}>
              <div className="text-xl font-semibold cursor-pointer text-gray-300">Tasks</div>
            </NavLink>
          )}
        </div>
      </div>
      <div className="hidden md:flex gap-4">
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
      <button
        className="md:hidden flex items-center px-2 py-1 border rounded text-gray-200 border-gray-400 focus:outline-none"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 shadow-md flex flex-col items-center gap-4 py-4 md:hidden z-50">
          {todos && (
            <NavLink to={"tasks"} onClick={() => setMenuOpen(false)}>
              <div className="text-xl font-semibold cursor-pointer text-gray-300">Tasks</div>
            </NavLink>
          )}
          {!user ? (
            <>
              <button
                className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors w-4/5"
                onClick={() => { setMenuOpen(false); navigate("signin"); }}
              >
                Sign In
              </button>
              <button
                className="border border-blue-500 text-blue-400 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors w-4/5"
                onClick={() => { setMenuOpen(false); navigate("signup"); }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              className="border border-blue-500 text-blue-400 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors w-4/5"
              onClick={() => { setMenuOpen(false); signOut(auth).then(() => setUser(null)); }}
            >
              Sign out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
