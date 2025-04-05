import db from "../Configuration/Cofig.js";

function addWishListByUser(req, res) {
    const { prop_id } = req.body;
    const  user_id  = req.user.id; 
    console.log("user id",user_id,"req.user.id",req.user.id);
    const querySelect = "SELECT * FROM wishlist WHERE user_id = ?;";
    const queryInsert = "INSERT INTO wishlist (user_id, prop_id) VALUES (?, ?);";

    db.query(querySelect, [user_id], (error, result) => {
        if (error) {
            return res.status(500).send({ success: false, message: error.message });
        }

        if (result.length > 0) {
       
            let propertyArray = result[0].prop_id ? result[0].prop_id.split(",") : [];
            
            if (propertyArray.includes(prop_id.toString())) {
                return res.status(200).send({ success: false, message: "Property already added" });
            } 

            propertyArray.push(prop_id);
            const updatedArray = propertyArray.join(",");

            const queryUpdate = "UPDATE wishlist SET prop_id = ? WHERE user_id = ?;";
            db.query(queryUpdate, [updatedArray, user_id], (error) => {
                if (error) {
                    return res.status(500).send({ success: false, message: error.message });
                }
                return res.status(200).send({ success: true, message: "Property added to wishlist", wishlist: updatedArray });
            });

        } else {
       
            db.query(queryInsert, [user_id, prop_id], (error) => {
                if (error) {
                    return res.status(500).send({ success: false, message: error.message });
                }
                return res.status(201).send({ success: true, message: "Property added to wishlist", wishlist: [prop_id] });
            });
        }
    });
}

function removeWishListByUser(req, res) {
    const {  prop_id } = req.body;
    const  user_id  = req.user.id; 

    console.log("user id",user_id,"req.user.id",req.user.id);

    const querySelect = "SELECT * FROM wishlist WHERE user_id = ?;";
    const queryUpdate = "UPDATE wishlist SET prop_id = ? WHERE user_id = ?;";
    const queryDelete = "DELETE FROM wishlist WHERE user_id = ?;";

    db.query(querySelect, [user_id], (error, result) => {
        if (error) {
            return res.status(500).send({ success: false, message: error.message });
        }

        if (result.length === 0) {
            return res.status(200).send({ success: false, message: "No wishlist found for this user" });    
        }

        let propertyArray = result[0].prop_id ? result[0].prop_id.split(",") : [];

        if (!propertyArray.includes(prop_id.toString())) {
            return res.status(201).send({ success: false, message: "Property not found in wishlist" });
        }

     
        propertyArray = propertyArray.filter((id) => id !== prop_id.toString());

        // if (propertyArray.length > 0) {
            const updatedArray = propertyArray.join(",");
            db.query(queryUpdate, [updatedArray, user_id], (error) => {
                if (error) {
                    return res.status(500).send({ success: false, message: error.message });
                }
                return res.status(200).send({ success: true, message: "Property removed from wishlist", wishlist: updatedArray });
            });
        // } else {
         
        //     db.query(queryDelete, [user_id], (error) => {
        //         if (error) {
        //             return res.status(500).send({ success: false, message: error.message });
        //         }
        //         return res.status(200).send({ success: true, message: "Wishlist is now empty, entry deleted" });
        //     });
        // }
    });
}

function getWishListByUser(req, res) {
    const  user_id  = req.user.id; 
    console.log("user id",user_id,"req.user.id",req.user.id);
    
    const querySelect = "SELECT prop_id FROM wishlist WHERE user_id = ?;";

    db.query(querySelect, [user_id], (error, result) => {
        if (error) {
            return res.status(500).send({ success: false, message: error.message });
        }

        if (result.length === 0) {
            return res.status(404).send({ success: false, message: "No wishlist found for this user" });
        }

        const propertyArray = result[0].prop_id ? result[0].prop_id.split(",") : [];

        return res.status(200).send({ success: true, wishlist: propertyArray });
    });
}

function getAllPropertiesWithInterestCount(req, res) {
    const query = `
        SELECT  p.*, 
        COUNT(w.user_id) AS interested_users_count
        FROM property p
        LEFT JOIN wishlist w ON FIND_IN_SET(p.prop_id, w.prop_id) > 0
        GROUP BY p.prop_id
        ORDER BY interested_users_count DESC;
    `;

    db.query(query, (error, result) => {
        if (error) {
            return res.status(500).send({ success: false, message: error.message });
        }

        return res.status(200).send({ success: true, properties: result });
    });
}


export default { addWishListByUser,removeWishListByUser ,getWishListByUser,getAllPropertiesWithInterestCount};
