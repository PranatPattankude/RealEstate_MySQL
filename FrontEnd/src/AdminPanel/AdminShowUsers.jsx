import React, { useEffect, useState } from "react";
import authService from "../Servises/authService";

const AdminShowUsers = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  if (!token) {
    alert("User is not authorized");
    return null; // Prevents component from rendering if user is unauthorized
  }
  async function handleDelete(u){
    const response = await authService.deleteUser(u.id)
    console.log(response);
    
    alert(response)
    fetchUsers()
}
  async function fetchUsers() {
    try {
      const response = await authService.getUsers();
      console.log("Response from adminShowUsers:", response);
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center" style={{ minHeight: "400px" }}>
        {users.length !== 0 ? (
          <div className="m-md-4 w-100">
               <h1 className="text-center mb-2">All Users</h1>
            <table className="table table-striped ps-2 text-center">
              <thead>
                <tr>
                  <th scope="col">Sr.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">MobNo</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id || i}>
                    <th scope="row">{i + 1}</th>
                    <td>{u.name}</td>
                    <td>{u.MobNo}</td>
                    <td>{u.email}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(u)}
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
          <h4 className="text-center m-0 w-100">Users Not Found</h4>
        )}
      </div>
    </>
  );
};

export default AdminShowUsers;
