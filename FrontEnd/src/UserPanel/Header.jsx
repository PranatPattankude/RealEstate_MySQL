import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import HeaderBG from "../assets/HeaderBG.png";
import "./UserCss/Header.css";
import { useNavigate } from "react-router-dom";
import propertyService from "../Servises/propertyService";

const Header = ({setFilteredProperty}) => {
  const [property, setProperty] = useState([]);
  // const [filteredProperty, setFilteredProperty] = useState(property);
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [avl, setAvl] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    alert("User is not Authenticated !!");
    // navigate("/login"); // Redirect user instead of stopping execution
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:7000/property/getfilteredPropertyByModal`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { type, location, size, price, avl },
        }
      );

      console.log(
        "Response from FilterModal:",
        response.data.filteredProperties
      );
      if (response.data.filteredProperties.length !== 0) {
        setFilteredProperty(response.data.filteredProperties);
      } else {
        setFilteredProperty([]); // Use an empty array instead of an empty string
      }
    } catch (error) {
      console.error("Error Filtering Property:", error);
      alert("Property Not Found");
    } finally {
      setLoading(false);
    }
  };

  async function fetchProperty() {
    try {
      const response = await propertyService.getAllProperty();
      setProperty(response);
    } catch (error) {
      alert(`Failed to get properties`);
      console.error(`Failed to get properties: ${error.message}`);
    }
  }

  const handleFilter = async (availability) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:7000/property/getfilteredPropertyByModal`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { avl: availability },
        }
      );
      setFilteredProperty(response.data.filteredProperties || []);
    } catch (error) {
      console.error("Error Filtering Property:", error);
      alert("Property Not Found");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProperty();
  }, []);

  // console.log("Filtered property by header", filteredProperty);
  console.log("allProperty", property);

  return (
    <div
      className="hero-section d-flex align-items-center justify-content-center cu-header"
      style={{
        backgroundImage: `url(${HeaderBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="search-container p-4"
        style={{
          backgroundImage: `url(${HeaderBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white text-center">YOUR DREAM HOME</h1>
        <p className="text-white text-center">IS ONE CLICK AWAY</p>
        <div className="tabs d-flex justify-content-center"><div className="tabs d-flex justify-content-center">
          <button className="tab-btn cu-HeaderBtn" onClick={() => setFilteredProperty([])}>ALL UNITS</button>
          <button className="tab-btn cu-HeaderBtn" type="button" onClick={() => handleFilter("Rent")}>FOR RENT</button>
          <button className="tab-btn cu-HeaderBtn" type="button" onClick={() => handleFilter("Sale")}>FOR SALE</button>
        </div></div>
        <div className="search-box mt-3 p-3 rounded">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-2 mb-2">
                <label>Looking for</label>
                <select
                  className="form-control bg-secondary-subtle text-back"
                  id="type"
                  value={type}
                  style={{width:"auto"}}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="Flat">Flat</option>
                  <option value="Banglo">Banglo</option>
                  <option value="Room">Room</option>
                  <option value="House">House</option>
                </select>
              </div>
              <div className="col-md-2 mb-2">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control bg-secondary-subtle text-back"
                  // style={{width:"auto"}}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="col-md-2 mb-2">
                <label>Property size</label>
                <select
                  className="form-control bg-secondary-subtle text-back"
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">Size</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="Room">Room</option>
                  <option value="House">House</option>
                </select>
              </div>
              <div className="col-md-2 mb-2">
                <label>Budget</label>
                <input
                  type="text"
                  className="form-control bg-secondary-subtle text-back"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="col-md-2 mb-2">
                <label>Availability</label>
                <select
                  className="form-control bg-secondary-subtle text-back"
                  id="Avl"
                  value={avl}
                  onChange={(e) => setAvl(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Rent">Rent</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>
              <div className="col-md-1 mb-2">
                <label></label>
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ width: "auto" }}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
