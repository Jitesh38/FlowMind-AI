import { Outlet } from "react-router";
import { Navbar, Footer } from "./component";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUser } from "./context/UserContextProvider";
import { useEffect, useState } from "react";

function Layout() {
  const { setUser } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log('In Layout Jsx:',currentUser);
      setLoading(false); // Done loading
    });
    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
   <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-200">
    <div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-6"></div>
    <div className="text-xl text-black-700 font-semibold">
      Loading...
    </div>
  </div>
    ); 
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
