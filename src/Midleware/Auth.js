const midleware=(req,res,next)=>{
    console.log(`conection to ${req.url}`)
    next()
}

module.exports=midleware