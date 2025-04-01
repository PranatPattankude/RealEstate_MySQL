import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../PropertyModal/ModalCss/EditModal.css";
import authService from "../Servises/authService";

const FilterProperty = ({ Show, setShowFilterModal, setProperty }) => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [avl, setAvl] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [owners, setOwners] = useState([]);
  const [owner_id, setOwner_id] = useState("");
  if (!token) {
    alert("User is not Authenticated !!");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:7000/property/getfilteredPropertyByModal`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { type, location, size, area, price, avl ,owner_id},
        }
      );

      console.log(
        "Response from FilterModal:",
        response.data.filteredProperties
      );
      if (response.data.filteredProperties.length != 0) {
        setProperty(response.data.filteredProperties);
      } else {
        setProperty("");
      }
      handleCloseModal();
      
    } catch (error) {
      console.error("Error Filtering Property:", error);
      alert("Failed to filter property.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowFilterModal(false);
  };

  async function fetchOwners() {
    try {
      const usersInfo = await authService.getAllUsers();
      if (usersInfo) {
        setOwners(
          usersInfo.filter((u) => u.role?.toLowerCase().includes("seller"))
        );
      } else {
        console.error("Failed to fetch owners information.");
      }
    } catch (error) {
      console.error("Error fetching owners data:", error);
    }
  }

  useEffect(() => {
    fetchOwners();
  }, []);

  console.log("all owners", owners);

  return (
    <Modal show={Show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter Property</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary-subtle">
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
              />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="area" className="form-label">
                Area
              </label>
              <input
                type="text"
                className="form-control"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
              >
                <option value="">Select</option>
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
              </select>
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="owner_id" className="form-label">
                Owner
              </label>
              <select
                className="form-control"
                id="owner_id"
                // from property table 
                value={owner_id}
                onChange={(e) => setOwner_id(e.target.value)}
              >
                <option value="">Select</option>
                {/* from user Table  */}
                {owners.map((w) => (
                  <option value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseModal}
          disabled={loading}
        >
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Filtering..." : "Filter"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterProperty;
