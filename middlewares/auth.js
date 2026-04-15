// const jwt =require("jsonwebtoken");
// const userModel=require("./../models/user");
// module.exports=async (req,res,next)=>{
//     const authHeader=req.header("Authorization")?.split("")[1]
//     if(authHeader?.length !== 2){
//         return res.status(403).json({message:"شما دسترسی به این ادرس را ندارید."})
//     }
//     const token=authHeader[1];
//     try {
//         const jwtPaylod=jwt.verify(token,process.env.JWT_SECRET);

//         const user=await userModel.findById(jwtPaylod.id).lean();
//         Reflect.deleteProperty(user,"password")
//         req.user=user;
//         next();
//     } catch (error) {
//         return res.json(error)
//     }
// }
const jwt = require("jsonwebtoken");
const userModel = require("./../models/user");

module.exports = async (req, res, next) => {
   
    
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "شما دسترسی به این ادرس را ندارید." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(jwtPayload.id).lean();

        if (!user) {
            return res.status(401).json({ message: "کاربر یافت نشد" });
        }

        Reflect.deleteProperty(user, "password");

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "توکن نامعتبر است" });
    }
};