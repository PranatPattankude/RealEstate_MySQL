import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteProperty = ({Show,Property,handleClose}) => {
  console.log("function is call BrandDeleteModule",Property);
  
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    alert("User is not Authenticated !!");
    return null;
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:7000/property/deleteProperty/${Property.prop_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      handleClose();
    } catch (error) {
      console.error("Error deleting Property:", error);
      alert("Failed to delete Property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={Show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Property</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary-subtle">
        {Property ? `Are you sure you want to delete Property?` : "Property not found"}
      </Modal.Body>
      <Modal.Footer>
        
        <Button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProperty;
