import axios from "axios";


const inquiryService =  {
    getAllInquiries :async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
        try {
          const response = await axios.get("http://localhost:7000/inquiry/getAllInquiries",
            {
              headers: { Authorization: `Bearer ${token}` },
            });
          console.log('response.data getAllInquiries from inquiryService',response.data.inquiries);
          return response.data.inquiries;     
        } catch (error) {
          console.log(" Failed get inquiries ", error);
          throw error;
        }
      },

      addInquiry:async (inq_type ,  name  , email , MobNo , msg ,sender_id) => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        try {
          const response = await axios.post("http://localhost:7000/inquiry/addInquiry",
            {inq_type ,  name  , email , MobNo , msg,sender_id },
            
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return response.data.message;     
        } catch (error) {
          console.log("Failed to add inquiries ", error);
          throw error;
        }
      },

}

export default inquiryService