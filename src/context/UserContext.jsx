import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

axios.defaults.withCredentials = true;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/users/register", { name, email, password });
      toast.success(data.msg);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Register failed");
      setBtnLoading(false);
    }
  }

  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", { email, password });
      toast.success(data.msg);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
      setBtnLoading(false);
    }
  }

  async function logout() {
    try {
      await axios.get("/api/users/logout");
      setUser([]);
      setIsAuth(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  const [loading, setLoading] = useState(true);
  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/users/me");
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ loginUser, btnLoading, isAuth, user, loading, registerUser, logout, setUser }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);