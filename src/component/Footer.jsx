import React, { useEffect, useState } from "react";
import { getTotalUsers } from "./fireFunctions";

const Footer = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const count = await getTotalUsers();
      setTotalUsers(count);
    };
    fetchTotalUsers();
  }, []);

  return (
    <footer className="w-full bg-gray-900 text-white py-4 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <span className="text-sm">&copy; {new Date().getFullYear()} FlowMind AI. All rights reserved.</span>
        <span className="text-sm mt-2 md:mt-0">Total Users: <span className="font-bold text-teal-400">{totalUsers}</span></span>
      </div>
    </footer>
  );
};

export default Footer;
