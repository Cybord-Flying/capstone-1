// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
};

async function getAllUsers(users) 
  try {
    const {rows: users } = await client.query(`
    SELECT users.*   FROM users
    `);
  /* this adapter should fetch a list of users from your db */

 
    return users;
  } catch (error) {
    throw error;
  }


  async function createUser  ({ username, password }) {
    const { rows: [user]}  = await client.query( `INSERT INTO users( username, password )
    VALUES($1, $2)
    ON CONFLICT(username) DO NOTHING
    RETURNING id, username
    ;`, [username,password]);
}
