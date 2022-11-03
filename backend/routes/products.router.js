let router = require("express").Router()
const { products } = require("../controllers/index")
var {middlewareAuth} = require("../middlewares")

router.get("/",middlewareAuth.optional,products.getProducts);
router.get("/filter",middlewareAuth.optional,products.getFilteredProducts);
router.get("/skip/:skip",middlewareAuth.optional,products.getSkipedProducts);
router.get("/search/:query",products.getSearchProducts)
router.get("/like/:idProduct",middlewareAuth.required,products.modLikeProduct)
router.get("/:idProduct",products.getProduct);
router.post("/",products.addProduct);
router.delete("/:idProduct",products.deleteProduct);
router.put("/:idProduct",products.updateProduct);



module.exports = router;