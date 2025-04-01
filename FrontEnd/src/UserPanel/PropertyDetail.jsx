import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import propertyService from "../Servises/propertyService";
import authService from "../Servises/authService";

const PropertyDetail = () => {
  const token = localStorage.getItem("token");
  const [property, setProperty] = useState([]);
  const [users,setUsers]=useState([])
  const { prop_id } = useParams();
//   console.log(prop_id);

  const getProperty = async () => {
    const response = await propertyService.getOneProperty(prop_id);
    setProperty(response);
  };

  async function fetchUsers() {
    try {
      const userInfo = await authService.getAllUsers();
      if (userInfo) {
        setUsers(userInfo);
      } else {
        console.error("Failed to fetch user information.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

    useEffect(() => {
     
    if (!token) {
      if (!token) {
        alert("User is not Authenticated !!");
      }
    }
    fetchUsers()
    getProperty();
  }, []);
  console.log("property", property);
//   console.log("property image", property[0].propertyImage);
  console.log("all users in property details",users);
  
  if (!property) {
    return <div className="text-center my-5">Loading property details...</div>;
  }
  return (
    <>
      <div className="container my-5">
      <div className="card shadow-lg p-4 border-0 rounded-3">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <img src={property.propertyImage} alt="Property" className="img-fluid rounded shadow-sm w-100" style={{ maxHeight: "350px", objectFit: "cover" }} />
          </div>
          <div className="col-lg-6 ">
            <h2 className="text-primary fw-bold mb-3">{property.type}</h2>
            <p className="mb-2"><strong>📍 Location:</strong> {property.location}</p>
            <p className="mb-2"><strong>📏 Area:</strong> {property.area} sq.ft</p>
            <p className="mb-2"><strong>📐 Size:</strong> {property.size}</p>
            <p className="mb-2"><strong>💰 Price:</strong> ${property.price}</p>
            <p className="mb-2"><strong>✅ Availability:</strong> {property.avl}</p>
            <p className="mb-2"><strong>🤠 Owner :</strong>    {users.find((user) => user.id === property.owner_id)?.name  ||
                        "Unknown Owner"}</p>
            {/* <p className="mb-2"><strong>🏷️ Property ID:</strong> {property.prop_id}</p> */}
          </div>
        </div>
        <div className="mt-4">
  <h4 className="text-secondary">📍 Google Map Location</h4>
  {property.gmap && property.gmap.length > 0 ? (
    <div className="rounded overflow-hidden shadow-sm" style={{ width: "100%", margin: "auto" }}>
      <iframe
        src={property.gmap}
        width="100%"
        height="250"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  ) : (
    <p className="text-danger">No exact location found.</p>
  )}
</div>

      </div>
    </div>
    </>
  );
};

export default PropertyDetail;
{/* <div className="container my-5">
<div className="card shadow-lg p-4">
  <div className="row">
    <div className="col-md-6">
      <img src={property.propertyImage} alt="Property" className="img-fluid rounded" />
    </div>
    <div className="col-md-6">
      <h2 className="text-primary">{property.type}</h2>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Area:</strong> {property.area} sqft</p>
      <p><strong>Size:</strong> {property.size}</p>
      <p><strong>Price:</strong> ₹ {property.price}</p>
      <p><strong>Availability:</strong> {property.avl}</p>
    
    </div>
  </div>
  <div className="mt-4">
    <h4 className="text-secondary">Google Map Location</h4>
    {property.gmap && property.gmap.length > 0 ? (
      <iframe
        src={property.gmap}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
      //   loading="lazy"
      //   referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    ) : (
      <p className="text-danger">No exact location found.</p>
    )}
  </div>
</div>
</div> */}