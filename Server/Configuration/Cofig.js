import mysql from 'mysql'

const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"sawant@802",
    database:"realEstate"
})

db.connect((error)=>{
    if(error){
       console.log("MySQL Fail to Connect ",error)
    }else{
        console.log("MySQL connect Successfully")
    }
    
})

export default db;