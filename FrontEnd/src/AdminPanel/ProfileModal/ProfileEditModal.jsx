import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const ProfileEditModal = ({ Show, user, handleClose }) => {
  console.log("User in edit modal:", user);

  const token = localStorage.getItem("token");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [MobNo, setMobNo] = useState(user?.MobNo || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      alert("User is not Authenticated !!");
      return;
    }

    // Ensure state updates when user data changes
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setMobNo(user.MobNo || "");
    }
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = { name, email, MobNo };

      await axios.put(
        `http://localhost:7000/user/updateUser/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      alert("User updated successfully!");
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={Show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary-subtle">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="MobNo" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="MobNo"
                value={MobNo}
                onChange={(e) => setMobNo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
   
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileEditModal;
