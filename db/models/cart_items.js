const client = require("../client")

async function createCartItem({ productId, orderId }) {
    try {
        const { rows: [item] } = await client.query(`
            INSERT INTO cart_items("productId", "orderId")
            VALUES ($1, $2)
            RETURNING *;
        `, [productId, orderId])
        return item;
    } catch (error) {
        throw error
    }
}

async function deleteCartItem(id) {
    try {
        const { rows: [deletedItem]} = await client.query(`
            DELETE FROM cart_items
            WHERE id=($1)
            RETURNING *;
        `, [id]);
        return deletedItem
    } catch (error) {
        throw error
    }
}

async function getCartItemsByOrderId(orderId) {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM cart_items
        WHERE "orderId"=($1);
    `, [orderId])
        return rows
    } catch (error) {
      console.log(error);
    }
}
  

module.exports = {
    createCartItem, deleteCartItem, getCartItemsByOrderId
}