let router = require("express").Router()
const { comments } = require("../controllers/index");
const { middlewareAuth } = require("../middlewares");

router.get("/",comments.getComments);
router.get("/:idProduct",comments.getComment);
router.post("/",middlewareAuth.required,comments.addComment);
router.delete("/:idProduct",comments.deleteComment);


module.exports = router;