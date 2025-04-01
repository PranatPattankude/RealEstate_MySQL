import db from "../Configuration/Cofig.js"
// const baseURL = "http://localhost:7000"


function addInquiry(req,res){
   
    try {
        const q1 = "insert into inquiry (inq_type ,  name  , email , MobNo , msg , sender_id )values(?,?,?,?,?,?);"
        const {inq_type ,  name  , email , MobNo , msg , sender_id } = req.body
        db.query(q1,[inq_type ,  name  , email , MobNo , msg , sender_id],(error,result)=>{
            if (error) throw error
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: "inquiry failed to added" })
            }
            res.status(200).send({ success: true, message: "inquiry Send Sucessfully" })
        }) 
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
        
    }

}

function getAllInquiries(req,res){
    const q2 = "select * from  inquiry;"
    try {
        db.query(q2,(error,result)=>{
            if (error) throw error
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: "inquiry failed to get" })
            }
            res.status(200).send({ success: true, inquiries:result })
        }) 
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })
        
    }

}

function deleteInquiry(req, res) {
    const inq_id = req.params.inq_id
    const q3 = 'delete from inquiry where inq_id = ?'
    try {
        db.query(q3, [inq_id], (error, result) => {
            if (error) throw error
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: "inquiry failed to delete" })
            }
            res.status(200).send({ success: true, message: "inquiry deleted Successfully" })
        })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })

    }
}

export default {addInquiry,deleteInquiry,getAllInquiries}