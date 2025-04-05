import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import WebsiteLogo from "../assets/wesiteLogo.png"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import authService from '../Servises/authService';
const NavigationBar = () => {
    const token = localStorage.getItem("token")
const navigate = useNavigate()
const [user,setUser]=useState([])
    function handleLogOut(){
        if(token){
            localStorage.removeItem("token")
            alert(" Logout Successfully !!")
            navigate('/LoginPage')
        }else{
            alert("failed to Logout")
        }
    }
async function getUserInfo(){
      try {
        const userInfo = await authService.getUser();
        if (userInfo) {
          setUser(userInfo);
        } else {
          console.error("Failed to fetch user information.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

}
    useEffect(()=>{

        getUserInfo()
    },[])

    console.log("user",user);
    return (
        <Navbar expand="lg" className="bg-white shadow-sm py-3 px-4">
        <div className="container">
            {/* Logo */}
            <Navbar.Brand as={Link} to="/UserHome/PropertyRender" className="d-flex align-items-center fw-bold">
                <img src={WebsiteLogo} alt="Logo" style={{width:"60px"}} className="me-2" />
                <span>MyEstate</span>
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto d-flex align-items-center gap-3">
                    <Nav.Link as={Link} to="/UserHome/PropertyRender" className="text-dark">Home</Nav.Link>
                    {/* <Nav.Link as={Link} to="/AdminHome/AddProduct" className="text-dark">Add Property</Nav.Link> */}
                    <Nav.Link as={Link} to="/UserHome/RealEstateInquiry" className="text-dark">Inquiry</Nav.Link>
                  
                    <Nav.Link as={Link} to="/UserHome/Profile" className="text-dark">{user.role} : {user.name}</Nav.Link>
                    
                    <Nav.Link as={Link} to="/UserHome/WishList" className="text-dark">Intrested Property</Nav.Link>

                    <Button variant="danger" className="d-flex align-items-center" onClick={handleLogOut} >
                        LogOut 
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </div>
    </Navbar>
    );
};

export default NavigationBar;
