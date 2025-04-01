import db from "../Configuration/Cofig.js"
const baseURL = "http://localhost:7000"

function addProperty(req, res) {
    console.log("req from body :", req.body);

    try {
        const { type, location, size, area, price, avl, gmap,status } = req.body;
        if (!type) {
            return res.status(400).send({ success: false, message: "type is required" });
        }

        const prop_img = req.file ? req.file.filename : null;

        const q1 = 'INSERT INTO property (type, location, size, area,price,  avl, gmap,status,  prop_img ) VALUES (?,?, ?, ?, ?, ?, ?, ?,?)';

        db.query(q1, [type, location, size, area, price, avl, gmap,status, prop_img], (error, result) => {
            if (error) throw error;
            res.status(200).send({ success: true, message: "Property  added successfully", addedProperty: result });
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

function addPropertyByOwner(req, res) {
    console.log("req from body :", req.body);

    try {
        const { type, location, size, area, price, avl, gmap,status,owner_id } = req.body;
        if (!type) {
            return res.status(400).send({ success: false, message: "type is required" });
        }

        const prop_img = req.file ? req.file.filename : null;

        const q1 = 'INSERT INTO property (type, location, size, area,price,  avl, gmap,status,  prop_img,owner_id ) VALUES (?,?, ?, ?, ?, ?, ?, ?,?,?)';

        db.query(q1, [type, location, size, area, price, avl, gmap,status, prop_img,owner_id], (error, result) => {
            if (error) throw error;
            res.status(200).send({ success: true, message: "Property  added successfully", addedProperty: result });
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


function getAllProperty(req, res) {
    const q2 = 'select * from property;'

    try {
        db.query(q2, (error, result) => {
            if (error) throw error
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: 'No Property Found' })

            }

            const allProperties = result.map((p) => ({
                ...p,
                propertyImage: p.prop_img ?
                    `${baseURL}/uploads/${p.prop_img}`
                    : null
            }))
            res.status(200).send({ success: true, allProperties: allProperties })
        })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })

    }
}


function deleteProperty(req, res) {
    const prop_id = req.params.prop_id
    const q3 = 'delete from property where prop_id = ?'
    try {
        db.query(q3, [prop_id], (error, result) => {
            if (error) throw error
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: "property failed to delete" })
            }
            res.status(200).send({ success: true, message: "property deleted" })
        })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })

    }
}

function updateProperty(req, res) {
    const { type, location, size, area, price, avl, gmap,status } = req.body;
    const prop_id = req.params.prop_id;
    const prop_img = req.file ? req.file.filename : null;
    let q4;
    let queryParams;
    if (prop_img) {
        q4 = 'UPDATE property  SET type = ?, location = ?, size = ?, area = ?, price = ?, avl = ?,gmap=?,status=?, prop_img = ?  WHERE prop_id = ?;';
        queryParams = [type, location, size, area, price, avl, gmap,status, prop_img, prop_id];

    } else {
        q4 = 'UPDATE property  SET type = ?, location = ?, size = ?, area = ?, price = ?, avl = ?,gmap=?,status=?  WHERE prop_id = ?;';
        queryParams = [type, location, size, area, price, avl, gmap,status, prop_id];

    }
    try {
        db.query(q4, queryParams, (error, result) => {
            if (error) throw error
            if (result.affectedRows == 0) {
                res.status(200).send({ success: false, message: 'property fail to update' })

            }
            res.status(200).send({ success: true, message: 'property name update successfully' })
        })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message })

    }
}

function getOneProperty(req, res) {
    const prop_id = req.params.prop_id;
    const q5 = "SELECT * FROM property WHERE prop_id = ?";

    db.query(q5, [prop_id], (error, result) => {
        if (error) {
            return res.status(500).send({ success: false, message: error.message });
        }

        if (result.length === 0) {
            return res.status(404).send({ success: false, message: "Property Not Found" }); // Changed status to 404 for better API design
        }

        const Property = result.map((p) => ({
            ...p,
            propertyImage: p.prop_img ? `${baseURL}/uploads/${p.prop_img}` : null,
        }));

        res.status(200).send({ success: true, Property: Property[0] });
    });
}


function filterProperty(req, res) {
    const type = req.query.type;
    const q6 = 'SELECT * FROM property WHERE type LIKE ?;';
    console.log("Type of property in filterProperty:", type);

    try {
        db.query(q6, [`%${type}%`], (error, result) => {
            if (error) {
                return res.status(500).send({ success: false, message: error.message });
            }

            if (result.length === 0) {
                return res.status(200).send({ success: false, message: "Property Not Found" });
            }

            res.status(200).send({ success: true, filteredProperty: result });
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

function filterPropertyByStatus(req,res){
    const status = req.query.status;
    const q18 = 'SELECT * FROM property WHERE status LIKE ?;';
    console.log("status of property in filterPropertyByStatus:", status);

    try {
        db.query(q18, [`%${status}%`], (error, result) => {
            if (error) {
                return res.status(500).send({ success: false, message: error.message });
            }

            if (result.length === 0) {
                return res.status(200).send({ success: false, message: "Property Not Found" });
            }

            res.status(200).send({ success: true, filteredProperty: result });
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
function CountOfProperty(req, res) {
    const q7 = 'select count(prop_id) as TotalProperty from property where status="approved" ;'
    try {
        db.query(q7, (error, result) => {
            if (error) throw error
            console.log("Count of Property is ", result);

            res.status(200).send({ success: true, ProductCount: result[0] })
        })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message })

    }
}


const getfilteredPropertyByModal = (req, res) => {
    const { type, location, size, area, price, avl , owner_id } = req.query;
    let query = "SELECT * FROM property WHERE 1=1";
    let queryParams = [];
    if (type) {
        query += " AND type = ?";
        queryParams.push(type);
    }

    if (size) {
        query += " AND size = ?";
        queryParams.push(size);
    }
    if (area) {
        query += " AND area = ?";
        queryParams.push(area);
    }
    if (price) {
        query += " AND price = ?";
        queryParams.push(price);
    }
    if (avl) {
        query += " AND avl = ?";
        queryParams.push(avl);
    }
    if (owner_id) {
        query += " AND owner_id = ?";
        queryParams.push(owner_id);
    }
    if (location) {
        query += " AND location like  ?";
        queryParams.push(`%${location}%`);
    }
    try {
        db.query(query, queryParams, (error, result) => {
            if (error) return res.status(500).json({ success: false, message: error.message });

            if (result.length == 0) {
                return res.status(200).json({ success: false, message: 'property not found' });
            }
            res.status(200).send({ success: true, filteredProperties: result });

        });

    } catch (error) {
        console.error("Error fetching filtered property:", error);
        res.status(500).send({ success: true, message: error.message });
    }
};


export default {filterPropertyByStatus, addProperty,addPropertyByOwner, getfilteredPropertyByModal, getAllProperty, deleteProperty, updateProperty, getOneProperty, filterProperty, CountOfProperty }

// const getProductByBrand = (req, res) => {
//     const brand_id = req.params.brand_id;
//     const q11 = 'SELECT * FROM product WHERE brand_id = ?';
//     const q12 = 'SELECT * FROM brand WHERE brand_id = ?';

//     try {

//         db.query(q12, [brand_id], (error, brandResults) => {
//             if (error) return res.status(500).json({ success: false, message: error.message });

//             if (brandResults.length === 0) {
//                 return res.status(200).json({ success: false, message: 'Brand not found' });
//             }


//             db.query(q11, [brand_id], (error, productResults) => {
//                 if (error) return res.status(500).json({ success: false, message: error.message });

//                 // if (productResults.length === 0) {
//                 //     return res.status(200).json({ success: false, message: 'No products found for this category' });
//                 // }



//                 const allProducts = productResults.map((p) => ({
//                     ...p,
//                     productImage: p.product_image ? `${baseURL}/uploads/${p.product_image}` : null,
//                 }));


//                 res.status(200).json({ success: true, brand: brandResults[0], allProducts: allProducts });
//             });
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const getProductByCategory = (req, res) => {
//     const category_id = req.params.category_id;
//     const q9 = 'SELECT * FROM product WHERE category_id = ?';
//     const q10 = 'SELECT * FROM category WHERE category_id = ?';

//     try {

//         db.query(q10, [category_id], (error, categoryResults) => {
//             if (error) return res.status(500).json({ success: false, message: error.message });

//             if (categoryResults.length === 0) {
//                 return res.status(200).json({ success: false, message: 'Category not found' });
//             }


//             db.query(q9, [category_id], (error, productResults) => {
//                 if (error) return res.status(500).json({ success: false, message: error.message });

//                 // if (productResults.length === 0) {
//                 //     return res.status(200).json({ success: false, message: 'No products found for this category' });
//                 // }



//                 const allProducts = productResults.map((p) => ({
//                     ...p,
//                     productImage: p.product_image ? `${baseURL}/uploads/${p.product_image}` : null,
//                 }));


//                 res.status(200).json({ success: true, category: categoryResults[0], allProducts: allProducts });
//             });
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// function filteredProduct(req, res) {
//     const name = req.params.name
//     const q8 = `select * from product where product_name like ? ;`
//     try {
//         db.query(q8, [`%${name}%`], (error, result) => {
//             if (error) throw error
//             console.log("Count of Product is ", result);

//             res.status(200).send({ success: true, filteredProducts: result })
//         })
//     } catch (error) {
//         res.status(500).send({ success: false, message: error.message })

//     }

// }