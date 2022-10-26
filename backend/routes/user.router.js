let router = require("express").Router()
var { user } = require("../controllers/index")
var {middlewareAuth} = require("../middlewares")

router.get("/",middlewareAuth.required,user.getUsers)
router.post("/",middlewareAuth.required,user.setUserProfile)
router.get("/:username",middlewareAuth.optional,user.getUserProfile)

module.exports = router;