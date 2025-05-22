import { readData } from "../component/fireFunctions";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      readData("users", user.uid).then((data) => {
        if (data !== null) {
          setTodos(data);
          setLoading(false);
        } else {
          setTodos(null);
        }
      });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, todos, setTodos, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContext;
export { UserContextProvider };
