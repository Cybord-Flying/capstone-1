const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils")

router.get("/", async (req, res, next) => {
    try {
        const allCartItems = await getAllCart_items();
        res.send(allCartItems)
    } catch (error) {
        next(error)
    }
});


module.exports = router;