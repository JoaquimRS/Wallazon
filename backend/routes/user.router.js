let router = require("express").Router()
var { user } = require("../controllers/index")
var {middlewareAuth} = require("../middlewares")

router.get("/all",middlewareAuth.required,user.getUsers)
router.get("/",middlewareAuth.required,user.getUser)
router.get("/follow/:username",middlewareAuth.required,user.changeFollow)
router.post("/",middlewareAuth.required,user.setUserProfile)
router.get("/:username",middlewareAuth.optional,user.getUserProfile)

module.exports = router;