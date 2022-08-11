
    async function getAllProducts(products) {
  try {
    const {rows: products } = await client.query(`
    SELECT products.* FROM products
    `);
  /* this adapter should fetch a list of users from your db */

 
    return products;
  } catch (error) {
    throw error;
  }
}