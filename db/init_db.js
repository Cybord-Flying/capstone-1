<<<<<<< HEAD

const {
   createProduct
  // declare your model imports here
  // for example, User
}= require('../db/models/products');

const  client = require('./client')



    
    
  

    async function createTables(){
  
        client.connect();
        await client.query(`
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS cart_order;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS role;
    DROP TABLE IF EXISTS products;
    `);
        console.log('creating tables')
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(5,2) DEFAULT 0,
      image TEXT
      );
      
      CREATE TABLE role(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    
       CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "roleId" INTEGER REFERENCES role(id)
      );

      CREATE TABLE cart_order(
        id SERIAL PRIMARY KEY,
        "orderStatus" BOOLEAN DEFAULT TRUE,
        "userId" INTEGER REFERENCES users(id)

      );

      CREATE TABLE cart_items(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES cart_order(id)

      );

      
      
      `)
      console.log("finished creating tables")
    // drop tables in correct order
   

    // build tables in correct order
    
  };
=======
const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}
>>>>>>> a0fd15e92487a3230cdcbf61ca6c47cb81ca34dd

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
<<<<<<< HEAD
    const product1 = await createProduct({name: "Special",
    description: "special",
  price: 145.99,
image: "google.com",})

const product2 = await createProduct({name: "Ferme",
description : "special",
price : 125.99,
image : "google.com"})

const product3 = await createProduct ({name: "Duke",
description: "duke",
price: 200.99,
image :"google.com"})

const product4 = await createProduct ({name: "Monarch",
description: "monarch",
price: 165.99,
image :" google.com"})

const product5 = await createProduct ({name: "Montblane",
description: "montblane",
price: 85.99,
image :" google.com"})

const product6 = await createProduct ({name: "Jaeger",
description: "Jaeger",
price: 105.99,
image :"google.com"})



   


  } catch (error) {
    throw error;
  }
};



createTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());


=======
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
>>>>>>> a0fd15e92487a3230cdcbf61ca6c47cb81ca34dd
