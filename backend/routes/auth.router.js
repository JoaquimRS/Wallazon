let router = require("express").Router()
const { auth } = require("../controllers/index")

router.get("/",auth.getUsers)
router.post("/",auth.addUser)

module.exports = router;