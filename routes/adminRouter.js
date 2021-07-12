const express=require('express');
const router =express.Router()
const admin=require('../models/admin')



//Getting all.............................
router.get('/',async(req,res)=>{
   try{
    const admins=await admin.find()
    res.json(admins)
   }catch(error){
     res.status(500).json({message:error.message})
   }
})



//getting one.................................
router.get('/admin/:id',getadmin,(req,res)=>{
    res.send(res.admin)
})


//creating one...............................
router.post('/create',async(req,res)=>{
    const u=new admin({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try{
        const newadmin=await u.save()
        res.status(201).json(newadmin)
    }catch(error){
        res.status(400).json({message:error.message})

    }
    
})


//updating one......................................
router.patch('/update/:id', getadmin, async (req, res) => {
    if (req.body.name != null) {
      res.admin.name = req.body.name
    }
    if (req.body.email != null) {
      res.admin.email = req.body.email
    }
    if (req.body.password != null) {
        res.admin.password = req.body.password
      }
    try {
      const updateduser = await res.admin.save()
      res.json(updateduser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })


//delete one.....................................
router.delete('/delete/:id',getadmin,async (req,res)=>{
    try {
        await res.admin.remove()
        res.json({ message: 'Admin Deleted ' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})


//middleware function...................................
async function getadmin(req,res,next){
    let tadmin
    try{
        tadmin=await admin.findById(req.params.id)
        if(tadmin==null){
            return res.status(404).json({message:"Admin not found !"})
        }

    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.admin=tadmin
    next()
}



module.exports=router