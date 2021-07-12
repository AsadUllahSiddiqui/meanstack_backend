const express=require('express');
const router =express.Router()
const user=require('../models/user')



//Getting all.............................
router.get('/',async(req,res)=>{
   try{
    const users=await user.find()
    res.json(users)
   }catch(error){
     res.status(500).json({message:error.message})
   }
})



//getting one.................................
router.get('/user/:id',getuser,(req,res)=>{
    res.send(res.user)
})


//creating one...............................
router.post('/create',async(req,res)=>{
    const u=new user({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try{
        const newuser=await u.save()
        res.status(201).json(newuser)
    }catch(error){
        res.status(400).json({message:error.message})

    }
    
})


//updating one......................................
router.patch('/update/:id', getuser, async (req, res) => {
    if (req.body.name != null) {
      res.user.name = req.body.name
    }
    if (req.body.email != null) {
      res.user.email = req.body.email
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
      }
    try {
      const updateduser = await res.user.save()
      res.json(updateduser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })


//delete one.....................................
router.delete('/delete/:id',getuser,async (req,res)=>{
    try {
        await res.user.remove()
        res.json({ message: 'Deleted user' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})


//middleware function...................................
async function getuser(req,res,next){
    let tuser
    try{
        tuser=await user.findById(req.params.id)
        if(tuser==null){
            return res.status(404).json({message:"canoout find user"})
        }

    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.user=tuser
    next()
}



module.exports=router