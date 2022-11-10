let router = require("express").Router()
const { categories } = require("../controllers/index");
const { middlewareAuth } = require("../middlewares");

router.get("/",categories.getCategories);
router.get("/:idCategory",middlewareAuth.optional,categories.getCategory);
router.post("/",categories.addCategory);
router.delete("/:idCategory",categories.deleteCategory);
router.put("/:idCategory",categories.updateCategory);


module.exports = router;