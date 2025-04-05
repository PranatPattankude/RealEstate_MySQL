import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Badge } from "react-bootstrap";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";
import PropertyImage1 from "../assets/PropertyImage1.png";
import PropertyShowcase from "./PropertyShowcase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import authService from "../Servises/authService";
import axios from "axios";
import propertyService from "../Servises/propertyService";

const WishList = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [wishListIds, setWishListIds] = useState([]);
  const [allProperties, setAllProperties] = useState([]);

  const PropertyDetails = (property) => {
    try {
      navigate(`/UserHome/PropertyDetail/${property.prop_id}`);
    } catch (error) {
      alert(`Failed to get Property Details`);
      console.error(`Failed to get Property Details: ${error.message}`);
    }
  };
  const getWishlist = async () => {
    const response1 = await axios.get(
      `http://localhost:7000/wishlist/getWishListByUser`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const response2 = await propertyService.getAllProperty();

    setWishListIds( response1.data.wishlist || []);
    setAllProperties(response2);
  };

  const handleRemove = async (prop_id) => {
    console.log("property delete id ", prop_id);
    console.log("token", token);

    const response3 = await axios.delete(
      `http://localhost:7000/wishlist/removeWishListByUser`,

      {
        headers: { Authorization: `Bearer ${token}` },
        data: { prop_id }, 
      },
    
    );
    if(response3.data.success){
    alert(response3.data.message);
    getWishlist()
    }
  
  };

  useEffect(() => {
    if (!token) {
      alert("user is not Login");
    } else {
      getWishlist();
    }
  }, []);

  const wishlistItems = allProperties?.filter((p) =>
    wishListIds.includes(String(p.prop_id))
  );
  console.log("wishlistItems", wishlistItems);

  console.log("wishlist", wishListIds);
  console.log("all Properties", allProperties);

  return (
    <>
      {wishListIds?.length != 0 ? (
        <div className="  g-4">
          <div className="text-end fw-bold my-3">
            Total WishList Property : {wishlistItems?.length}
          </div>
          <div className="d-flex flex-wrap gap-3 justify-content-center my-5">
            {wishlistItems.map((p) => (
              <div className="" key={p.id}>
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
                    </div>
                    <Card.Title className="fs-6">{p.Type}</Card.Title>
                    <Card.Text className="text-muted small">
                      <FaMapMarkerAlt className="me-1" />{" "}
                      {p.location.length > 20
                        ? `${p.location.slice(0, 27)}...`
                        : p.location}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer
                    className="p-1 text-center bg-danger-subtle"
                    onClick={() => handleRemove(p.prop_id)}
                  >
                    Remove
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div  className="d-flex justify-content-center align-items-center " style={{minHeight:"400px"}}>
        <h4>No Any Property Found</h4>
        </div>
      )}
    </>
  );
};

export default WishList;
