const client = require("./client");
const { createUser } = require("./users");
const { createUser, getAllUsers, getUsersById, getUsersByUsername, attachUsersToRole, updateUsers } = require("./users");
const { createProduct, getProductById, getProductWithoutCart_Items, getAllProducts, getAllProductsByUser,   updateProducts, destroyProducts } = require("./prducts");
