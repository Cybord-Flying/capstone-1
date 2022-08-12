 const client = require("../client")

     async function getAllProducts() {
try {
const {rows} = await client.query(`
     SELECT * FROM products
 `);
   /* this adapter should fetch a list of users from your db */

 
 return rows;
  } catch (error) {
    throw error;   }
 }

 async function createProduct({name,description,price,image}){
  try{
    const {rows} = await client.query(`
    INSERT INTO products(name,description,price,image)
    VALUES($1,$2,$3,$4)
    
    `,[name,description,price,image])
    return rows;
    

  }
  catch (error){
  throw error;  }
 }
 module.exports = {
  getAllProducts, createProduct
   }