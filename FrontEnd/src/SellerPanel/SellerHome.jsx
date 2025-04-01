import React from 'react'
// import AdminNavigationBar from './AdminNavigationBar'
import Footer from '../Components/Footer'
// import Property from './Property'
// import Inquiry from './Inquiry'
import {Route, BrowserRouter as Router, Routes ,Navigate} from 'react-router-dom'
import Profile from '../AdminPanel/Profile'
// import PropertyDetail from './PropertyDetail'
// import DeleteInquiryModal from './InquiryModal/DeleteInquiryModal'
// import AddProduct from '../PropertyModal/AddProperty'
// import AdminShowUsers from './AdminShowUsers'
// import AdminShowSellers from './AdminShowSellers'
import SellerNavigationBar from './SellerNavigationBar'
import SellerAddProperty from './SellerAddProperty'
import SellerPropertyStatus from './sellerPropertyStatus'

const SellerHome = () => {
  return (
   <>

<div>
      <SellerNavigationBar />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="SellerAddProperty" />} />
          <Route path="SellerAddProperty" element={<SellerAddProperty />} />
          <Route path="SellerPropertyStatus" element={<SellerPropertyStatus />} />
          <Route path='Profile' element={<Profile/>} />
          {/* <Route path='PropertyDetail/:prop_id' element={<PropertyDetail/>}/> */}
          {/* <Route path='/DeleteInquiry/:inq_id' element={<DeleteInquiryModal/>}/> */}
          {/* <Route path='AddProduct' element={<AddProduct/>} /> */}
          {/* <Route path='Users' element={<AdminShowUsers/>}/> */}
          {/* <Route path="Sellers" element={<AdminShowSellers/>}/> */}
        </Routes>
      </div>
      <Footer/>
    </div>
   
   </>
  )
}

export default SellerHome;