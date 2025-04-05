import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const IntrestedProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
const token = localStorage.getItem("token")
const navigate = useNavigate()
const PropertyDetails = (property) => {
    try {
      navigate(`/AdminHome/PropertyDetail/${property.prop_id}`);
    } catch (error) {
      alert(`Failed to get Property Details`);
      console.error(`Failed to get Property Details: ${error.message}`);
    }
  };
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/wishlist/getAllPropertiesWithInterestCount",
          {
            headers:{Authorization:`Bearer ${token}`} }
        );
        setProperties(response.data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Interested Properties</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              {/* <th>Property Name</th> */}
              <th>Location</th>
              <th>Price</th>
              <th>Interested Users</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.prop_id}  onClick={() => PropertyDetails(property)}>
                {/* <td>{property.name}</td> */}
                <td>{property.location?.length > 40 ? `${property.location.slice(0,30)}...` : property.location }</td>
                <td>₹ {property.price}</td>
                <td className="text-center">{property.interested_users_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IntrestedProperty;