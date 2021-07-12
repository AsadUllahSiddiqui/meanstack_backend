const express=require('express');
const router =express.Router()
const product=require('../models/product')



//Getting all.............................
router.get('/',async(req,res)=>{
   try{
    const products=await product.find()
    res.json(products)
   }catch(error){
     res.status(500).json({message:error.message})
   }
})



//getting one.................................
router.get('/product/:id',getproduct,(req,res)=>{
    res.send(res.product)
})


//creating one...............................
router.post('/create',async(req,res)=>{
    const u=new product({
        name:req.body.name,
        img:req.body.img,
        categoryId:req.body.categoryId,
        quantity:req.body.quantity,
        price:req.body.price,
        brandName:req.body.brandName,
        discription:req.body.discription,
        discount:req.body.discount
    })
    try{
        const newproduct=await u.save()
        res.status(201).json(newproduct)
    }catch(error){
        res.status(400).json({message:error.message})

    }
    
})


//updating one......................................
router.patch('/update/:id', getproduct, async (req, res) => {
    if (req.body.name != null) {
      res.product.name = req.body.name
    }
    if (req.body.img != null) {
        res.product.img = req.body.img
      }
      if (req.body.categoryId != null) {
        res.product.categoryId = req.body.categoryId
      }
      if (req.body.quantity != null) {
        res.product.quantity = req.body.quantity
      }
      if (req.body.brandName != null) {
        res.product.brandName = req.body.brandName
      }
      if (req.body.discription != null) {
        res.product.discription = req.body.discription
      }
      if (req.body.discount != null) {
        res.product.discount = req.body.discount
      }
      if (req.body.price != null) {
        res.product.price = req.body.price
      }
    try {
      const updatedproduct= await res.product.save()
      res.json(updatedproduct)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })


//delete one.....................................
router.delete('/delete/:id',getproduct,async (req,res)=>{
    try {
        await res.product.remove()
        res.json({ message: ' Product Deleted' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})


//middleware function...................................
async function getproduct(req,res,next){
    let tproduct
    try{
        tproduct=await product.findById(req.params.id)
        if(tproduct==null){
            return res.status(404).json({message:"product not fount!"})
        }

    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.product=tproduct
    next()
}



module.exports=router