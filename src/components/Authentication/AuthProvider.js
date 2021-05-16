import { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom"
import { auth } from "../../utils/firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const logout = () => {
      auth.signOut().then(() => {
          setUser(null)
          console.log(history)
          history.push("/login")
      })
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>
  );
};
