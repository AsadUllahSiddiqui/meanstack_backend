const express=require('express');
const router =express.Router()
const category=require('../models/category')



//Getting all.............................
router.get('/',async(req,res)=>{
   try{
    const categories=await category.find()
    res.json(categories)
   }catch(error){
     res.status(500).json({message:error.message})
   }
})



//getting one.................................
router.get('/category/:id',getcategory,(req,res)=>{
    res.send(res.category)
})


//creating one...............................
router.post('/create',async(req,res)=>{
    const u=new category({
        name:req.body.name,
        img:req.body.img
    })
    try{
        const newcategory=await u.save()
        res.status(201).json(newcategory)
    }catch(error){
        res.status(400).json({message:error.message})

    } 
})


//updating one......................................
router.patch('/update/:id', getcategory, async (req, res) => {
    if (req.body.name != null) {
      res.category.name = req.body.name
    }
    if (req.body.email != null) {
      res.category.imgurl = req.body.imgurl
    }
    try {
      const updatedcategory= await res.category.save()
      res.json(updatedcategory)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })


//delete one.....................................
router.delete('/delete/:id',getcategory,async (req,res)=>{
    try {
        await res.category.remove()
        res.json({ message: 'Deleted category' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})


//middleware function...................................
async function getcategory(req,res,next){
    let tcategory
    try{
        tcategory=await category.findById(req.params.id)
        if(tcategory==null){
            return res.status(404).json({message:"category not found!"})
        }

    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.category=tcategory
    next()
}



module.exports=router