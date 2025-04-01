import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../PropertyModal/ModalCss/EditModal.css";
const EditProperty = ({ Show, Property, handleClose, handleEdit }) => {
  console.log("Brand in edit module:", Property);

  const [type, setType] = useState(Property.type);
  const [location, setLocation] = useState(Property.location);
  const [previewImage, setPreviewImage] = useState(null);
  const [size, setSize] = useState(Property.size);
  const [area, setArea] = useState(Property.area);
  const [price, setPrice] = useState(Property.price);
  const [avl, setAvl] = useState(Property.avl);
  const [prop_img, setProp_img] = useState(Property.prop_img);
  const [status,setStatus]=useState(Property.status)
  const [gmap, setGmap] = useState(Property.gmap || "No Link Added");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    alert("User is not Authenticated !!");
  }

  useEffect(() => {
    if (Property) {
      setType(Property.type || "");
      setPreviewImage(Property.prop_img || "");
    }
  }, [Property]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProp_img(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("location", location);
      formData.append("size", size);
      formData.append("area", area);
      formData.append("price", price);
      formData.append("avl", avl);
      formData.append("gmap", gmap);
      formData.append("status", status);


      if (prop_img) {
        formData.append("prop_img", prop_img);
      }

      const response = await axios.put(
        `http://localhost:7000/property/updateProperty/${Property.prop_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Property updated successfully!");

      handleClose();
      // handleEdit(response.data);
    } catch (error) {
      console.error("Error updating Property:", error);
      alert("Failed to update Property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={Show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary-subtle">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="type" className="form-label">
                Type Of Property
              </label>
              <select
                className="form-control"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Flat">Flat</option>
                <option value="Banglo">Banglo</option>
                <option value="Room">Room</option>
                <option value="House">House</option>
              </select>
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="type" className="form-label">
                Location Of Property
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="size" className="form-label">
                size
              </label>
              <input
                type="text"
                className="form-control"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="Area" className="form-label">
                Area(sq.ft)
              </label>
              <input
                type="text"
                className="form-control"
                id="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="avl" className="form-label">
                Availability
              </label>
              <select
                className="form-control"
                id="avl"
                value={avl}
                onChange={(e) => setAvl(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
              </select>
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="avl" className="form-label">
                Stutus
              </label>
            <select
                className="form-control"
                id="type"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
               
              </select>
              </div>
            <div className="mb-3 col-12 ">
              <label htmlFor="gmap" className="form-label">
                gmap Link
              </label>
              <input
                type="text"
                className="form-control"
                id="gmap"
                // {gmap.length !=0 ?  value={gmap} :  value={"No Link added"}}
                value={gmap}
                onChange={(e) => setGmap(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <label htmlFor="PropImage" className="form-label">
                Property Image
              </label>
              <input
                type="file"
                className="form-control"
                id="PropImage"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            {previewImage && (
              <div className="m-auto col-12 col-md-6 cu-imgEditModal">
                <img
                  src={previewImage}
                  alt="Property Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Close
        </Button> */}
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProperty;
