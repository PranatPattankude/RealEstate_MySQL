import React, { useEffect, useState } from 'react';
import propertyService from '../Servises/propertyService';
import authService from '../Servises/authService';

const SellerPropertyStatus = () => {
  const [property, setProperty] = useState([]);
  const [user, setUser] = useState(null);

  async function fetchProperty() {
    try {
      const response = await propertyService.getAllProperty();
      setProperty(response);
    } catch (error) {
      alert(`Failed to get properties`);
      console.error(`Failed to get properties: ${error.message}`);
    }
  }

  async function fetchUser() {
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

  useEffect(() => {
    fetchProperty();
    fetchUser();
  }, []);

  if (!user) {
    return <h4 className="text-center m-0 w-100">Loading user data...</h4>;
  }

  const userProperty = property.filter((p) => p.owner_id === user.id);

  return (
    <div>
    
      <div className="d-flex flex-column justify-content-center" style={{ minHeight: "400px" }}>
      <h2 className="text-center my-4">Your Property Status</h2>
        {userProperty.length !== 0 ? (
          <table className="table table-striped ps-2 text-center">
            <thead>
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Image</th>
                <th scope="col">Type</th>
                <th scope="col">Location</th>
                <th scope="col">Area (sq.ft)</th>
                <th scope="col">Price</th>
                <th scope="col">Detail</th>
                <th scope="col">Available</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {userProperty.map((p, i) => (
                <tr key={p.id || i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <img
                      src={`http://localhost:7000/uploads/${p.prop_img}`}
                      alt="Property"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                  <td>{p.type}</td>
                  <td>
                    {p.location.length > 20
                      ? p.location.split(" ").splice(-1).join(" ")
                      : p.location}
                  </td>
                  <td>{p.area}</td>
                  <td>₹ {p.price}</td>
                  <td>{p.size}</td>
                  <td>{p.avl}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4 className="text-center m-0 w-100">No Properties Found</h4>
        )}
      </div>
    </div>
  );
};

export default SellerPropertyStatus;
