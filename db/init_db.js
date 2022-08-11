const {
  client
  // declare your model imports here
  // for example, User
}= require('./DB_cyborg flying');




async function dropTables() {
  try {
    client.connect();
    await client.query(`
    DROP TABLE IF EXISTS cart_order,
    DROP TABLES IF EXISTS products,
    DROP TABLES IF EXISTS users ,
    DROP TABLES IF EXISTS cart_items,
    DROP TABLES IF EXISTS role,
  

    
    `)}
    catch(error) {
      throw error
    }
  };

    async function createTables(){
      try {
        client.connect()
    await client.query(`CREATE Table products)(
      id INT,
      name VARCHAR(255),
      description TEXT,
      price DECIMAL(3,2);
      );
    
       CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(255);
      );

      CREATE TABLE cart_order(
        id SERIAL PRIMARY KEY,
        amount DECIMAL(6,2),
        user_id INTEGER REFERENCE users(id);

      )

      CREATE TABLE cart_items(
        id INT,
        quantity INTEGER,
        total_amount DECIMAL(7,2);
      )

      CREATE TABLE role(
        id INT,
        name VARCHAR(255);
      )
      `)
      console.log("finished creating tables")
    // drop tables in correct order
   

    // build tables in correct order
  } catch (error) {
    throw error;
  }
};

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const user1 = await user1.createUser({
      
    })
  } catch (error) {
    throw error;
  }
};

createTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
