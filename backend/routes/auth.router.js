let router = require("express").Router()
var { auth } = require("../controllers/index")
var {middlewareAuth} = require("../middlewares")

router.get("/",auth.login)
router.post("/",auth.register)
router.delete("/:uuid",auth.deleteUser)

module.exports = router;