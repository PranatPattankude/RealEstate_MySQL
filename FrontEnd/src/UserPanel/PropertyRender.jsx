import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Badge } from "react-bootstrap";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";
import PropertyImage1 from "../assets/PropertyImage1.png";
import propertyService from "../Servises/propertyService";
import PropertyShowcase from "./PropertyShowcase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaHeart  } from "react-icons/fa";
import axios from "axios";
const PropertyRender = () => {
  const [property, setProperty] = useState([]);
  const [filteredProperty, setFilteredProperty] = useState([]);
  const [propertyCount, setPropertyCount] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function fetchProperty() {
    try {
      const response = await propertyService.getAllProperty();
      setProperty(response);
    } catch (error) {
      alert(`Failed to get properties`);
      console.error(`Failed to get properties: ${error.message}`);
    }
  }

  const PropertyDetails = (property) => {
    try {
      navigate(`/UserHome/PropertyDetail/${property.prop_id}`);
    } catch (error) {
      alert(`Failed to get Property Details`);
      console.error(`Failed to get Property Details: ${error.message}`);
    }
  };
  function handleAllProperties() {
    navigate("/UserHome/AllProperties");
  }
  async function CountOfProperty() {
    const response = await propertyService.CountOfProperty();
    setPropertyCount(response);
  }

  const handleAddWishList = async (prop_id) => {
    const response = await axios.post(
      `http://localhost:7000/wishlist/addWishListByUser`,
      { prop_id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert(response.data.message);
  };
  useEffect(() => {
    CountOfProperty();
    fetchProperty();
  }, []);
  console.log("propertyCount", propertyCount);

  const propertiesToRender =
    filteredProperty.length > 0 ? filteredProperty : property;
  const validProperties = propertiesToRender.filter(
    (p) => p.status == "approved"
  );
  const displayedProperties = validProperties.slice(-8);
  return (
    <>
      <Header setFilteredProperty={setFilteredProperty} />

      <div className="container my-5">
        <h2 className="text-center">Explore Our Properties</h2>
        <p className="text-center text-muted">
          Enjoy the variety of 100+ different properties in the market!
        </p>
        <div className="row g-4">
          <div className="text-end fw-bold">
            TotalProperty : {propertyCount}
          </div>
          {}
          {displayedProperties.map((p) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={p.id}>
              <Card
                className="border-0 rounded-3 overflow-hidden"
                style={{
                  transition: "0.3s",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0px 8px 50px rgba(0, 0, 0, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0px 4px 10px rgba(0, 0, 0, 0.1)")
                }
              >
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:7000/uploads/${p.prop_img}`}
                    // src={p.propertyImage}
                    alt={p.type}
                    style={{ height: "180px" }}
                    onClick={() => PropertyDetails(p)}
                  />
                  <Badge
                    className={`position-absolute top-0 bg-${
                      p.avl === "Rent" ? "primary" : "success"
                    } start-0 m-2`}
                  >
                    {p.avl}
                  </Badge>
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>
                      <FaBed /> {p.size}
                    </span>
                    <span>
                      <FaRulerCombined /> {p.area} sq.ft
                    </span>
                    <span>
                      <GiTakeMyMoney />
                      {p.price}
                    </span>
                    <button
                      onClick={() => handleAddWishList(p.prop_id)}
                      className="btn btn-primary btn-sm p-0 text-white"
                      style={{ height: "30px", width: "30px" }}
                      // className={`position-absolute top-0  end-0 m-2`}
                    >
                      <FaHeart  />
                    </button>
                  </div>
                  <Card.Title className="fs-6">{p.Type}</Card.Title>
                  <Card.Text className="text-muted small">
                    <FaMapMarkerAlt className="me-1" />{" "}
                    {p.location.length > 20
                      ? `${p.location.slice(0, 27)}...`
                      : p.location}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {propertiesToRender.length >= 8 && (
        <div className="text-center">
          <button
            className="btn btn-success border border-rounded"
            onClick={handleAllProperties}
          >
            See Properties
          </button>
        </div>
      )}
      <PropertyShowcase />
    </>
  );
};

export default PropertyRender;
