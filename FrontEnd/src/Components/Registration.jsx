import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
// import "../css/Login.css";
import "../Components/ComponentCss/Login.css"
import YellowLayer from "../assets/YellowLayerImage.png";
import RegistredBoy from "../assets/RegistredBoy.png";
import Lamp from "../assets/Lamp.png";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const Registration = () => {
  const [role, setRole] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [MobNo,setMobNo]=useState(null)
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    // console.log("role from Registration form",role,name,email,MobNo,password);//geted
    
    try {
      const response = await axios.post('http://localhost:7000/user/registration',{name, email,MobNo, password,role})
      console.log(response.data.message);
      alert(response.data.message)
      if(response.data.success){
        setSuccessMessage("Registration Sucessfully ! you can login ")
        navigate('/LoginPage')
      }
    } catch (error) {
      console.log("Registration failed ",error.message);
      
        alert("Registration failed ")
      }
    }



  return (
    <div className="d-flex backgroundColor vw-100 vh-100">
      <div className="col-12 col-lg-6  h-100 d-flex justify-content-center align-items-center">
        <form className="form w-50 d-flex flex-column " onSubmit={onSubmit}>

          <h1 className="text-center fs-3">REGISTRATION PAGE</h1>
          <label className="">Name</label>
          <input type="text" className=" input" required autoFocus 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          <label className="">Email</label>
          <input type="email" className=" input" required 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
           <label className="">Mobile Number</label>
           <input type="text" className=" input" required 
            value={MobNo}
            onChange={(e)=>setMobNo(e.target.value)}
          />
          <label>Password</label>
          <input type="Password" className="input" required 
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
          />
          <p>Role</p>
<div className="d-flex mb-3">
  <div>
    <input
      type="radio"
      value="admin"
      name="Role"
      checked={role === "admin"}
      onChange={(e) => setRole(e.target.value)}
    />
    <label>Admin</label>
  </div>
  <div className="ms-3">
    <input
      type="radio"
      value="user"
      name="Role"
      checked={role === "user"}
      onChange={(e) => setRole(e.target.value)}
    />
    <label>User</label>
  </div>
  <div className="ms-3">
    <input
      type="radio"
      value="unauth_seller"
      name="Role"
      checked={role === "unauth_seller"}
      onChange={(e) => setRole(e.target.value)}
    />
    <label>Seller</label>
  </div>
</div>
{errorMessage && <div>{errorMessage}</div>  }
{successMessage && <div>{successMessage}</div> }
          {/* <Link to="/LoginPage" className="m-auto"> */}
            <button
              type="submit"
              className="btn btn-warning text-white submitButton"
            >
              Submit
            </button>
          {/* </Link> */}
        </form>
      </div>
      <div className="d-none d-lg-block w-50 position-relative">
        <img
          src={RegistredBoy}
          className="h-50  position-absolute  z-1"
          style={{ top: "20%", left: "46%" }}
        />
        <img
          src={Lamp}
          className="h-25  position-absolute top-0 lampImage"
          style={{ left: "35%" }}
        />
        <img
          src={YellowLayer}
          className="h-100  position-absolute bottom-0 end-0"
        />
      </div>
    </div>
  );
}
export default Registration;
