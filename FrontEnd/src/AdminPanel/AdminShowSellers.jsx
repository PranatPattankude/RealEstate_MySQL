import React, { useEffect, useState } from "react";
import authService from "../Servises/authService";

const AdminShowSellers = () => {
  const token = localStorage.getItem("token");
  const [sellers, setSellers] = useState([]);

  if (!token) {
    alert("User is not authorized");
    return null; // Prevents component from rendering if user is unauthorized
  }
  async function handleApprove(s) {
    const response = await authService.userApprove(s.id);
    console.log(response);

    alert(response);
    fetchSellers();
  }
  async function handleDelete(s) {
    const response = await authService.deleteUser(s.id);
    console.log(response);

    alert(response);
    fetchSellers();
  }
  async function handleDenied(s) {
    const response = await authService.userDenied(s.id);
    console.log(response);
    alert(response);
    fetchSellers();
  }
  async function fetchSellers() {
    try {
      const response = await authService.getSellers();
      console.log("Response from adminShowSellers:", response);
      setSellers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchSellers();
  }, []);
  console.log("sellers", sellers);

  return (
    <>
      <div className="d-flex align-items-center" style={{ minHeight: "400px" }}>
        {sellers.length !== 0 ? (
          <div className="m-md-4 w-100">
            <h1 className="text-center mb-2">All Sellers</h1>
            <table className="table table-striped ps-2 text-center">
              <thead>
                <tr>
                  <th scope="col">Sr.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">MobNo</th>
                  <th scope="col">Email</th>
                  <th scope="col">Authontication</th>

                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((s, i) => (
                  <tr key={s.id || i}>
                    <th scope="row">{i + 1}</th>

                    <td>{s.name}</td>
                    <td>{s.MobNo}</td>
                    <td>{s.email}</td>
                    <td>
                      {s.role == "unauth_seller" ? "Unverifiled" : "verified"}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        {s.role == "unauth_seller" && (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleApprove(s)}
                          >
                            Approve
                          </button>
                        )}
                        {s.role == "auth_seller" && (
                          <button
                            className="btn btn-warning"
                            onClick={() => handleDenied(s)}
                          >
                            Denied
                          </button>
                        )}
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(s)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 className="text-center m-0 w-100">Seller Not Found</h4>
        )}
      </div>
    </>
  );
};

export default AdminShowSellers;
