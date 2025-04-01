import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import inquiryService from '../Servises/inquiryService';
import DeleteInquiryModal from './InquiryModal/DeleteInquiryModal';
import authService from '../Servises/authService';

const Inquiry = () => {
  const navigate = useNavigate()
  const [inquiry, setInquiry] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedInquiry, setSelectedInquiry] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [users, setUsers] = useState([]);

  const handleDelete = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDeleteModal(true);
  };
 const  handleCloseModal=()=>{
  setShowDeleteModal(false);
  setSelectedInquiry(null);
  fetchInquiry();
 }

 async function fetchUsers() {
  try {
    const usersInfo = await authService.getAllUsers();
    if (usersInfo) {
      setUsers(usersInfo);
   
    } else {
      console.error("Failed to get users information.");
    }
  } catch (error) {
    console.error("Error fetching users data:", error);
  }
}

  async function fetchInquiry() {
    try {
      const response = await inquiryService.getAllInquiries();
      setInquiry(response);
    } catch (error) {
      alert(`failed to get Inquiries`);
      console.log(`failed to get Inquiries : ${error.message}`);
    }
  }
  useEffect(() => {
    fetchUsers();
    fetchInquiry();
  }, [token]);

  console.log("inquiries from inquiry Function",inquiry);
  console.log("users ",users);
  
  return (
   <>
       <div className="d-flex align-items-center" style={{ minHeight: "400px" }}>
    {inquiry.length!=0 ? (
 
  <div className="m-md-4 w-100">
    
    <h4 className='text-center mb-3' >All Inquiries</h4>
    <table className="table table-striped ps-2 text-center">
      <thead>
        <tr>
          <th scope="col">Sr.No</th>
          <th scope="col">Type</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Mobile No.</th>
          <th scope="col">Message</th>
          <th scope="col">Sender</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {inquiry.map((inq, i) => (
          <tr key={inq.inq_id || i}>
            <th scope="row">{i + 1}</th>
           
            <td>{inq.inq_type}</td>
            <td>{inq.name}</td>
            <td>{inq.email} </td>
            <td>{inq.MobNo}</td>
            <td>{inq.msg}</td>
           <td> {users.find((u) => u.id === inq.sender_id)?.name || "Unknown"}</td>
            <td>
              <button className="btn btn-danger ms-2" onClick={()=>handleDelete(inq)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

    ):( <h4 className="text-center m-0 w-100">Inquiry Not Found</h4>)}
 </div>   
      {selectedInquiry   && (
        <>
          <DeleteInquiryModal Show={showDeleteModal} Inquiry={selectedInquiry}  handleClose={handleCloseModal} handleDelete={handleDelete}/>
        </>
      )}
   </>
  )
}

export default Inquiry