import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteInquiryModal = ({Show,Inquiry,handleClose}) => {
  console.log("function is call DeleteInquiryModal",Inquiry);
  
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
        `http://localhost:7000/inquiry/deleteInquiry/${Inquiry.inq_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      handleClose();
    } catch (error) {
      console.error("Error deleting Inquiry:", error);
      alert("Failed to delete Inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={Show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Inquiry</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary-subtle">
        {Inquiry ? `Are you sure you want to delete Inquiry?` : "Inquiry not found"}
      </Modal.Body>
      <Modal.Footer>
        
        <Button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteInquiryModal;
