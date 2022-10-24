let router = require("express").Router()
const { auth } = require("../controllers/index")


router.get("/",auth.getUsers)
router.post("/",auth.register)
router.post("/login",auth.login)
router.delete("/:uuid",auth.deleteUser)
router.get("/token",auth.getToken)

module.exports = router;