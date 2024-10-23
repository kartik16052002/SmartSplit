const testController=(req,res)=>{
    try {
        res.status(200).send({
            success:true,
            message:"successfull Test Controller"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in test controller",
            error
        })
    }
}


module.exports={testController};