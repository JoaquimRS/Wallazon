let router = require("express").Router()
const { products } = require("../controllers/index")

router.get("/",products.getProducts);
router.get("/:idProduct",products.getProduct);
router.post("/",products.addProduct);
router.delete("/:idProduct",products.deleteProduct);
router.put("/:idProduct",products.updateProduct);


module.exports = router;