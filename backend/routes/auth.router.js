let router = require("express").Router()
var { auth } = require("../controllers/index")
var {middlewareAuth} = require("../middlewares")

router.get("/",middlewareAuth.required,auth.getUsers)
router.post("/",auth.register)
router.get("/login",auth.login)
router.delete("/:uuid",auth.deleteUser)
router.get("/token",auth.getToken)

module.exports = router;