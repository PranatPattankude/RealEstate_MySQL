import db from "../Configuration/Cofig.js";
import jwt from 'jsonwebtoken'

function login(req, res) {
    const {email,password} = req.body;
    const query1 = "SELECT * FROM user WHERE email = ? AND password = ?";
    try {
        db.query(query1, [email,password], (error, result) => {
            if (error) throw error.message
            console.log("result ",result[0]);
            const payload = {id:result[0].id,role:result[0].role};
            console.log("user data from database",payload);
            const token = jwt.sign(payload,'batch40',{expiresIn:'1h'})
            console.log("token :" , token);
            
                res.status(200).send({ success: true,token: token , message : 'Login successfull'});
          
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}


function registration(req, res) {
    const { name, email, MobNo, password, role } = req.body;
    const checkUserQuery = "SELECT * FROM user WHERE email = ?";
    const insertUserQuery = "INSERT INTO user (name, email, MobNo, password, role) VALUES (?, ?, ?, ?, ?)";

    db.query(checkUserQuery, [email], (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Database error", error: error.message });
        }

        if ( result.length > 0) {
            return res.status(200).json({ success: false, message: "Already Registered" });
        }
        db.query(insertUserQuery, [name, email, MobNo, password, role], (error, result) => {
            if (error) {
                return res.status(500).json({ success: false, message: "Database error", error: error.message });
            }
            return res.status(201).json({ success: true, message: "User registered successfully" });
        });
    });
}

// function deleteUser(req,res){
//     const {name,email}=req.body
//     const query3 = "delete from user where name= ? and email= ?;"
// try {
//      db.query(query3,[name,email],(error,result)=>{
//         if (error) throw error ;
//     res.status(400).send({ success: true, message: "User Delete successfully"});

//      })
// } catch (error) {
//     res.status(500).send({ success: false, message: "User fail to Delete ", error:error.message});
    
// }
// }

function getUserInfo(req, res) {
   try {
    const userInfo = req.user; 
    const ID = userInfo.id
    const query5 = `SELECT * FROM user WHERE id = ${ID};`

    db.query(query5, (error, result) => {
        if (error) throw error;
        console.log("final result",result);
        
        res.status(200).json({ success: true, user: result });
    });
   } catch (error) {
    res.status(200).json({ success: true, error: error.message });
   }
}


function addProduct(req, res) {
    const { name, price, type, price_range } = req.body;

    const queryProduct = "INSERT INTO product (name, price) VALUES (?, ?);";
    const queryCategory = "INSERT INTO category (type, price_range) VALUES (?, ?);";

    try {
        db.query(queryProduct, [name, price], (error, productResult) => {
            if (error) throw error
        })
        db.query(queryCategory, [type, price_range], (error, categoryResult) => {
            if (error) throw error

            res.status(200).json({ success: true, message: "Product inserted successfully" });
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}


function updateUser(req, res) {
    const { user_id } = req.params;
    const { name, email, MobNo } = req.body;
    const query14 = 'UPDATE user SET name = ?, email = ?, MobNo = ? WHERE id = ?;';

    db.query(query14, [name, email, MobNo, user_id], (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Server error", error: error.message });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({ success: false, message: "User failed to update" });  
        }

        return res.status(200).json({ success: true, message: "User updated successfully!" });  
    });
}


function AdminPassReset(req,res){
    const { email,password } = req.body;
    const query7= 'update user set password = ? where email = ?;'
    try {
        db.query(query7,[password,email],(error,result)=>{
            if(error) throw error
            if (result.affectedRows === 0){
                res.status(200).send({success:false,message:"password fail to reset"})
            }
            res.status(200).send({success:true,message:"Password Reset Sucessfully !!"})
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
        
    }
}

function getAllUsers(req,res){
    const query4 = "select * from user;"
try {
     db.query(query4,(error,result)=>{
    if (error) throw error 
    res.status(200).send({ success: true, users : result});

     })
} catch (error) {
    res.status(500).send({ success: false, message:error.message});
    
}
}

function getSellers(req,res){
    const query5 = "select * from user where role like '%seller%'"
  
try {
     db.query(query5,(error,result)=>{
    if (error) throw error 
    if(result.affectedRows==0){
    res.status(500).send({ success: false, message:"Seller Not Found"});

    }
    res.status(200).send({ success: true, sellers : result});

     })
} catch (error) {
    res.status(500).send({ success: false, message:error.message});
    
}
}

function getUsers(req,res){
    const query6 = "select * from user where role='user';"
  
try {
     db.query(query6,(error,result)=>{
    if (error) throw error 
    if(result.affectedRows==0){
    res.status(500).send({ success: false, message:"Users Not Found"});

    }
    res.status(200).send({ success: true, users : result});

     })
} catch (error) {
    res.status(500).send({ success: false, message:error.message});
    
}
}

function userApprove(req,res){
    const query7= "update user set role = 'auth_seller' where id= ?; "
    const  id = req.body.id
try {
     db.query(query7,[id],(error,result)=>{
    if (error) throw error 
    if(result.affectedRows==0){
    res.status(500).send({ success: false, message:"seller fail to update"});

    }
    res.status(200).send({ success: true, message:"seller  update sucesssfully"});

     })
} catch (error) {
    res.status(500).send({ success: false, message:error.message});
    
}
}

function userDenied(req,res){
    const query19= "update user set role = 'unauth_seller' where id= ?; "
    const  id = req.body.id
try {
     db.query(query19,[id],(error,result)=>{
    if (error) throw error 
    if(result.affectedRows==0){
    res.status(500).send({ success: false, message:"seller fail to update"});

    }
    res.status(200).send({ success: true, message:"seller  update sucesssfully"});

     })
} catch (error) {
    res.status(500).send({ success: false, message:error.message});
    
}
}
function deleteUser(req, res) {
    const query8 = "delete from user where id = ?;";
    const id = req.params.id; 
    if (!id) {
        return res.status(400).send({ success: false, message: "ID is required" });
    }
    db.query(query8, [id], (error, result) => {
        if (error) {
            console.error("Error deleting seller:", error);
            return res.status(500).send({ success: false, message: "Database error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ success: false, message: "Seller not found" });
        }

        res.status(200).send({ success: true, message: "Seller deleted successfully" });
    });
}


export default {userDenied,getSellers,userApprove,getUsers,getAllUsers,updateUser,AdminPassReset, login, registration ,deleteUser,getUserInfo,addProduct};


// function allUsers(req,res){
//     const query4 = "select * from user;"
// try {
//      db.query(query4,(error,result)=>{
//     if (error) throw error 
//     res.status(400).send({ success: true, message: result});

//      })
// } catch (error) {
//     res.status(500).send({ success: false, error:error.message});
    
// }
// }

// function registration(req,res){
//     try {
        
//     } catch (error) {
//         res.status(404).send({error:error.message})
//     }
// }