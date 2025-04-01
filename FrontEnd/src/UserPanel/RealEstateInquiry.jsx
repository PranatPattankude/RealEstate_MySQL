import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserCss/RealEstateInquiry.css";
import propertyService from "../Servises/propertyService";
import authService from "../Servises/authService";
import inquiryService from "../Servises/inquiryService";

const RealEstateInquiry = () => {
  const [inq_type, setInq_type] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [MobNo, setMobNo] = useState("");
  const [msg, setMsg] = useState("");
  const [sender_id, setSender_id] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
   

    async function fetchUser() {
      try {
        const userInfo = await authService.getUser();
        if (userInfo) {
          setUser(userInfo);
          setSender_id(userInfo.id); // Set sender_id after fetching user
        } else {
          console.error("Failed to fetch user information.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, [token]); // Only run when `token` changes
  function clearInput() {
    setInq_type("");
    setName("");
    setEmail("");
    setMobNo("");
    setMsg("");
  }
  async function handleInquiry(e) {
    e.preventDefault();
    if (!token) {
      alert("User is not Authenticated !!");
      return;
    }
    if (!inq_type || !name || !email || !msg) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await inquiryService.addInquiry(
        inq_type,
        name,
        email,
        MobNo,
        msg,
        sender_id
      );
      if(response){
        alert(response);
        clearInput()
      }

    } catch (error) {
      console.error("Error submitting inquiry:", error);
    }
  }
  console.log("user", user);
  console.log("sender Id", sender_id);

  return (
    <div className="inquiry-section d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Features */}
          <div className="col-md-8 text-white">
            <h2 className="fw-bold">Why Our Service Is The Perfect Choice?</h2>
            <hr className="custom-line" />
            {[
              {
                title: "Expert Guidance",
                text: "Our experienced real estate agents provide personalized support to help you find the best property options.",
              },
              {
                title: "Seamless Transactions",
                text: "We ensure a smooth buying, selling, or renting process with transparent legal assistance.",
              },
              {
                title: "Tailored Solutions",
                text: "Whether you're an investor, first-time buyer, or seller, we customize our services to your needs.",
              },
              {
                title: "Exclusive Listings",
                text: "Get access to premium properties, including homes, apartments, and commercial spaces.",
              },
            ].map((feature, index) => (
              <div key={index} className="feature mt-4">
                <h4 className="fw-bold">{`${index + 1}. ${feature.title}`}</h4>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Right Side - Inquiry Form */}
          <div className="col-md-4">
            <div className="form-container p-4 rounded">
              <h4 className="fw-bold">Real Estate Inquiry Form</h4>
              <form onSubmit={handleInquiry}>
                <div className="mb-2">
                  <label htmlFor="inq_type" className="form-label">
                    Type Of Property
                  </label>
                  <select
                    className="form-control"
                    id="inq_type"
                    value={inq_type}
                    onChange={(e) => setInq_type(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Flat">Flat</option>
                    <option value="Banglo">Banglo</option>
                    <option value="Room">Room</option>
                    <option value="House">House</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label fw-bold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label fw-bold">Phone (Optional)</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="1234560509"
                    value={MobNo}
                    onChange={(e) => setMobNo(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label fw-bold">Message</label>
                  <textarea
                    className="form-control"
                    placeholder="Please Enter Your Message"
                    rows="3"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn cu-btn-primary w-100 fw-bold"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateInquiry;
