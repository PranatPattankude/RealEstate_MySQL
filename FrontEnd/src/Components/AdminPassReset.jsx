import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./ComponentCss/Login.css";
import authService from "../Servises/authService";
// import "../css/Login.css";
import YellowLayer from "../assets/YellowLayerImage.png";
import BoyDoingLogin from "../assets/BoyDoingLogin.png";
import Lamp from "../assets/Lamp.png";
// import authService from "../Servises/authService";
const AdminPassReset = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.verifyEmailAndPassword(formData.email, formData.password);
            if (response.success) {
                setVerified(true);
            } else {
                alert("Verification failed. Please check your credentials.");
            }
        } catch (error) {
            console.error(error);
            alert("Verification failed.");
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await authService.PassReset(formData.email, newPassword);
            alert("Password reset successfully!");
            navigate("/LoginPage");
        } catch (error) {
            console.error(error);
            alert("Password Reset Failed");
        }
    };

    return (
        <div className="d-md-flex backgroundColor vw-100 vh-100">
            <div className="col-12 col-lg-6 h-100 d-flex justify-content-center align-items-center">
                <form className="form w-50 d-flex flex-column" onSubmit={verified ? handleReset : handleVerify}>
                    <h1 className="text-center">PASSWORD RESET</h1>
                    <label>Email</label>
                    <input type="email" className="input" name="email" value={formData.email} onChange={handleChange} required />
                    <label>Password</label>
                    <input type="password" className="input" name="password" value={formData.password} onChange={handleChange} required />
                    {verified && (
                        <>
                            <label>New Password</label>
                            <input type="password" className="input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                            <label>Confirm Password</label>
                            <input type="password" className="input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </>
                    )}
                    <button type="submit" className="btn btn-warning text-white submitButton">
                        {verified ? "Reset Password" : "Verify"}
                    </button>
                </form>
            </div>
            <div className="d-none d-lg-block w-50 position-relative">
      <img
        src={BoyDoingLogin}
        className="h-50  position-absolute start-50  z-1"
        style={{ top: "20%" }}
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
};

export default AdminPassReset;
