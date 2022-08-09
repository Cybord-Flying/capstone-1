const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');



async function buildTables() {
  try {
    client.connect();
    await client.query(`DROP TABLE IF EXISTS order;
    DROP TABLES IF EXISTS products;
    DROP TABLES IF EXISTS users;
    DROP TABLES IF EXISTS shoppingcart;
    DROP TABLES IF EXISTS role;

    
    `);
    
    console.log("starting to create tables")
    
    await client.query(`CREATE Table products  (
      id INT,
      name VARCHAR(255),
      description TEXT,
      price DECIMAL(3,2),




      );

      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(255),
      );

      CREATE TABLE order(
        id SERIAL PRIMARY KEY,
        amount DECIMAL(6,2),
        user_id INTEGER REFERENCE users(id),

      )

      CREATE TABLE shoppingcart(
        id INT,
        quantity INTEGER,
        total_amount DECIMAL(7,2)
      )

      CREATE TABLE role(
        id INT,
        name VARCHAR(255),
      )
      `)
      console.log("finished creating tables")
    // drop tables in correct order
   

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const user1 = await User.createUser({
      
    })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
