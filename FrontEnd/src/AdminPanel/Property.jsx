import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import propertyService from "../Servises/propertyService";
import EditProperty from "../PropertyModal/EditProperty";
import DeleteProperty from "../PropertyModal/DeleteProperty";
import { useNavigate } from "react-router-dom";
import AddProperty from "../PropertyModal/AddProperty";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import FilterProperty from "../PropertyModal/FilterProperty";
import authService from "../Servises/authService";

const Property = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("");
  const [propertyCount, setPropertyCount] = useState(null);
  const handleEdit = (property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const handleDelete = (property) => {
    setSelectedProperty(property);
    setShowDeleteModal(true);
  };

  const handleAddProperty = () => {
    setShowAddProperty(true);
  };

  const handleFilterModal = () => {
    setShowFilterModal(true);
  };

  const handleCloseModal = (updatedProperties = null) => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowAddProperty(false);
    setShowFilterModal(false);
    setSelectedProperty(null);

    if (updatedProperties) {
      setProperty(updatedProperties);
    } else {
      fetchProperty();
    }
  };

  async function serchProperty(SelectedType) {
    setType(SelectedType);

    try {
      const serviceResponse = await propertyService.filterProperty(
        SelectedType
      );

      if (serviceResponse.length != 0) {
        setProperty(serviceResponse);
      }
    } catch (error) {
      alert(`${type}Property is not Found`);
      console.log(error.message);
      fetchProperty();
    }
  }

  async function fetchProperty() {
    try {
      const response = await propertyService.getAllProperty();
      setProperty(response);
      setPropertyCount(response.length);
    } catch (error) {
      alert(`Failed to get properties`);
      console.error(`Failed to get properties: ${error.message}`);
    }
  }

  const PropertyDetails = (property) => {
    try {
      navigate(`/AdminHome/PropertyDetail/${property.prop_id}`);
    } catch (error) {
      alert(`Failed to get Property Details`);
      console.error(`Failed to get Property Details: ${error.message}`);
    }
  };

  async function fetchUsers() {
    try {
      const usersInfo = await authService.getAllUsers();
      if (usersInfo) {
        setUsers(usersInfo);
      } else {
        console.error("Failed to fetch user information.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function filterPropertyByStatus(status) {
    const response = await propertyService.filterPropertyByStatus(status);
    setProperty(response);
  }

  //  const gmailLink = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60432.993638218635!2d73.2951578347304!3d18.79538553868276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be80711b08050b5%3A0x68fc1d6871dbd86d!2sKhopoli%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1742639157888!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  //     console.log(gmailLink.slice(12,-11));
  useEffect(() => {
    fetchUsers();
    fetchProperty();
  }, []);
  console.log("all Users from admin Property", users);
  console.log("all propertis", property);

  return (
    <>
      <div className="d-flex align-items-center" style={{ minHeight: "400px" }}>
        {property.length !== 0 ? (
          <div className="m-md-4 w-100">
            <div className="d-flex justify-content-between mb-3">
              <div>
                <form>
                  <div className="me-md-auto ">
                    <select
                      className="form-control bg-secondary-subtle text-back "
                      id="type"
                      style={{ width: "200px", border: "none" }}
                      value={type}
                      onChange={(e) => serchProperty(e.target.value)}
                    >
                      <option value="">All Type</option>
                      <option value="Flat">Flat</option>
                      <option value="Banglo">Banglo</option>
                      <option value="Room">Room</option>
                      <option value="House">House</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="">
                <select
                  className="form-control bg-secondary-subtle text-back "
                  id="type"
                  style={{ width: "200px", border: "none" }}
                  value={type}
                  onChange={(e) => filterPropertyByStatus(e.target.value)}
                >
                  <option value="">Search Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
              <div className="text-end">
                <button className="btn btn-primary" onClick={handleAddProperty}>
                  <MdFormatListBulletedAdd /> Add Property
                </button>
                <button
                  className="btn btn-info mx-2 text-light"
                  onClick={handleFilterModal}
                >
                  <FaFilter />
                </button>
              </div>
            </div>
            <div className="fw-bold fs-5 text-start text-primary my-2">
              Total Properties : {propertyCount}
            </div>
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
                  <th scope="col">Owner</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {property.map((p, i) => (
                  <tr key={p.id || i}>
                    <th scope="row">{i + 1}</th>
                    <td onClick={() => PropertyDetails(p)}>
                      <img
                        src={`http://localhost:7000/uploads/${p.prop_img}`}
                        // src={p.propertyImage}
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
                    <td>
                      {users.find((user) => user.id === p.owner_id)?.name ||
                        "Unknown Owner"}
                    </td>
                    <td>{p.status}</td>

                    <td>
                      <div className="d-flex">
                        {/* <button
                          className="btn btn-primary me-2"
                          onClick={() => handleEdit(p)}
                        >
                          Status
                        </button> */}
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(p)}
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
          <h4 className="text-center m-0 w-100">Products Not Found</h4>
        )}
      </div>

      <AddProperty Show={showAddProperty} handleClose={handleCloseModal} />
      <FilterProperty
        Show={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        handleClose={handleCloseModal}
        setProperty={setProperty}
      />
      {selectedProperty && (
        <>
          <EditProperty
            Show={showEditModal}
            Property={selectedProperty}
            handleClose={handleCloseModal}
          />
          <DeleteProperty
            Show={showDeleteModal}
            Property={selectedProperty}
            handleClose={handleCloseModal}
          />
        </>
      )}
    </>
  );
};

export default Property;
