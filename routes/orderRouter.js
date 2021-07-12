const express=require('express');
const router =express.Router()
const order=require('../models/order')



//Getting all.............................
router.get('/',async(req,res)=>{
   try{
    const orders=await order.find()
    res.json(orders)
   }catch(error){
     res.status(500).json({message:error.message})
   }
})



//getting one.................................
router.get('/order/:id',getorder,(req,res)=>{
    res.send(res.order)
})


//creating one...............................
router.post('/create',async(req,res)=>{
    const u=new order({
        userId:req.body.userId,
        productIdArray:req.body.productIdArray,
        productQuantityArray:req.body.productQuantityArray,
        productNameArray:req.body.productNameArray,
        totalPrice:req.body.totalPrice,
        totalDiscount:req.body.totalDiscount,
        delevedStatus:req.body.delevedStatus,
        phoneNo:req.body.phoneNo,
        address:req.body.address,
        city:req.body.city,
        postalCode:req.body.postalCode,
        ApartmentNo:req.body.ApartmentNo
    })
    try{
        const neworder=await u.save()
        res.status(201).json(neworder)
    }catch(error){
        res.status(400).json({message:error.message})

    } 
})


//updating one......................................
router.patch('/update/:id', getorder, async (req, res) => {
    if (req.body.delevedStatus != null) {
      res.order.delevedStatus = req.body.delevedStatus
    }
    try {
      const updatedorder= await res.order.save()
      res.json(updatedorder)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//delete one.....................................
router.delete('/delete/:id',getorder,async (req,res)=>{
    try {
        await res.order.remove()
        res.json({ message: 'Order Deleted' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})


//middleware function...................................
async function getorder(req,res,next){
    let torder
    try{
        torder=await order.findById(req.params.id)
        if(torder==null){
            return res.status(404).json({message:"order not found!"})
        }

    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.order=torder
    next()
}



module.exports=router