import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../PropertyModal/ModalCss/EditModal.css";
import authService from "../Servises/authService";

const SellerAddProperty = () => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [size, setSize] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [avl, setAvl] = useState("");
  const [prop_img, setProp_img] = useState(null);
  const [gmap, setGmap] = useState("");
  const [loading, setLoading] = useState(false);
  const [owner_id, setOwner_id] = useState(null);
  const [seller, setSeller] = useState([]);
  const [status, setStatus] = useState("Pending");

  const token = localStorage.getItem("token");

  if (!token) {
    alert("User is not Authenticated!");
    return null; // Stop rendering if unauthorized
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProp_img(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("location", location);
      formData.append("size", size);
      formData.append("area", area);
      formData.append("price", parseFloat(price) || 0); // Ensure price is a number
      formData.append("avl", avl);
      formData.append("status", status);
      formData.append("owner_id", owner_id);

      // Handle Google Maps link extraction safely
      const gmapMatch = gmap.match(/src="(.*?)"/);
      formData.append("gmap", gmapMatch ? gmapMatch[1] : gmap);

      if (prop_img) {
        formData.append("prop_img", prop_img);
      }

      const response = await axios.post(
        "http://localhost:7000/property/addPropertyByOwner",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Property Added Successfully!");
      setType("");
      setLocation("");
      setPreviewImage("");
      setSize("");
      setArea("");
      setPrice("");
      setAvl("");
      setProp_img("");
      setGmap("");
    } catch (error) {
      console.error("Error Adding Property:", error);
      alert("Failed to Add Property.");
    } finally {
      setLoading(false);
    }
  };

  async function fetchSeller() {
    try {
      const userInfo = await authService.getUser();
      if (userInfo) {
        // setSeller(userInfo);
        setOwner_id(userInfo.id);
      } else {
        console.error("Failed to fetch user information.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  console.log("owner_id", owner_id);

  useEffect(() => {
    fetchSeller();
  }, []);
  return (
    <div className="bg-secondary-subtle d-flex justify-content-center align-items-center min-vh-100 p-5">
      <div className="p-4 col-12 col-md-6 bg-white shadow-lg rounded">
        <h2 className="text-center">Added Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="type" className="form-label">
                Type Of Property
              </label>
              <select
                className="form-control"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Flat">Flat</option>
                <option value="Banglo">Banglo</option>
                <option value="Room">Room</option>
                <option value="House">House</option>
              </select>
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="location" className="form-label">
                Location Of Property
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="size" className="form-label">
                Size
              </label>
              <input
                type="text"
                className="form-control"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="area" className="form-label">
                Area (sq.ft)
              </label>
              <input
                type="text"
                className="form-control"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="text" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="avl" className="form-label">
                Availability
              </label>
              <select
                className="form-control"
                id="avl"
                value={avl}
                onChange={(e) => setAvl(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
              </select>
            </div>

            <div className="mb-3 col-12">
              <label htmlFor="gmap" className="form-label">
                Gmap Link
              </label>
              <input
                type="text"
                className="form-control"
                id="gmap"
                value={gmap}
                onChange={(e) => setGmap(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="PropImage" className="form-label">
                Property Image
              </label>
              <input
                type="file"
                className="form-control"
                id="PropImage"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>

            {previewImage && (
              <div className="m-auto col-12 col-md-6 text-center">
                <img
                  src={previewImage}
                  alt="Property Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>

          <div className="text-center mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerAddProperty;
