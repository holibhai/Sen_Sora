const express=require("express")
const { createProduct, getAllProducts, getProductById,updateProductById,deleteProductById } = require("../controller/product.controller")
const router = express.Router();
const upload=require("../middlewares/upload")

router.post('/', upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id',upload.single('image'), updateProductById);
router.delete('/:id', deleteProductById);


module.exports=router