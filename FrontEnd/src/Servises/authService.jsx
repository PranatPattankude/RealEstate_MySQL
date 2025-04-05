import axios from "axios";
import { useNavigate } from "react-router-dom";
// service module
// const navigate = useNavigate()
const authService = {
  // login service
  login: async (email, password) => {
    try {
      const response = await axios.post("http://localhost:7000/user/login", {
        email,
        password,
      });
      console.log("response.data", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("logined token is set by authService", token);
      return token;
    } catch (error) {
      console.log("Login Failed ", error);
      throw error;
    }
  },

  getUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.get(
        "http://localhost:7000/user/getUserInfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(
        "getUser info  from authService",
        response.data.user
      );
      return response.data.user[0];
    } catch (error) {
      console.log("failed to get User ", error);
      throw null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    alert("Sucessfully LogOut !!");
    console.log("Token is Remove from localStorage by authservices");
  },

  PassReset: async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/user/AdminPassReset",
        { email, password }
      );
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("fail to rest Password :", error);
    }
  },

  getAllUsers: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.get(
        "http://localhost:7000/user/getAllUsers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("getAllUsers in auth Services", response.data.users);
      return response.data.users;
    } catch (error) {
      console.log("failed to get User ", error);

      throw null;
    }
  },

  getUsers:async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.get(
        "http://localhost:7000/user/getUsers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("getUsers in auth Services", response.data.users);
      return response.data.users;
    } catch (error) {
      console.log("failed to get User ", error);

      throw null;
    }
  },

  getSellers:async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.get(
        "http://localhost:7000/user/getSellers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("getSellers in auth Services", response.data.sellers);
      return response.data.sellers;
    } catch (error) {
      console.log("failed to get sellers ", error);

      throw null;
    }
  },

  userApprove: async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.put(
        "http://localhost:7000/user/userApprove",
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        
        }
      );
      console.log("userApprove in auth Services", response.data.message);
      return response.data.message;
    } catch (error) {
      console.log("failed to approve sellers ", error);
      throw null;
    }
  },

  deleteUser: async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.delete(
        `http://localhost:7000/user/deleteUser/${id}`,
       
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("deleteUser from auth Services", response.data.message);
      return response.data.message;
    } catch (error) {
      console.log("failed to delete user ", error);
      throw null;
    }
  },

  userDenied:async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.put(
        "http://localhost:7000/user/userDenied",
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        
        }
      );
      console.log("userApprove in auth Services", response.data.message);
      return response.data.message;
    } catch (error) {
      console.log("failed to Denied sellers ", error);
      throw null;
    }
  },

   verifyEmailAndPassword : async (email, password) => {
    try {
      const response = await axios.post(`http://localhost:7000/user/verify-email-password`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default authService;
