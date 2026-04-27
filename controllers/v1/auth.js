const userModel=require("../../models/user")
const bcrypt=require("bcrypt")
const registerValidator=require("./../../validators/register")
const jwt=require("jsonwebtoken")
const banUserModel=require("./../../models/ban-phone")
exports.register=async (req,res)=>{ 
const validationRes=registerValidator(req.body)
if(validationRes!==true){
    return res.status(422).json(validationRes)
}
const {userName,name,email,password,phone}=req.body;
const isUserNameExists=await userModel.findOne({
    $or :[{userName}]
})
const isPhoneExists=await userModel.findOne({
    $or :[{phone}]
})
const isEmailExists=await userModel.findOne({
    $or :[{email}]
})
if(isUserNameExists){
    return res.status(409).json({
        message:"نام کاربری تکراری است"
    })
}
else if(isPhoneExists){
    return res.status(409).json({
        message:"شماره موبایل تکراری میباشد."
    })
}
else if(isEmailExists){
    return res.status(409).json({
        message:" ایمیل تکراری میباشد."
    })
}
const countOfUser=await userModel.countDocuments()

const hashedPassword=await bcrypt.hash(password,10)


// const isUserBan = await banUserModel.findOne({ phone: user.phone });

// if (isUserBan) {
//   return res.status(403).json({
//     message: "حساب کاربری شما مسدود شده است."
//   });
// }
const user= await userModel.create({
    email,
    userName,
    name,
    phone,
    password:hashedPassword,
    role:countOfUser > 0 ? "USER" : "ADMIN",
})
const userObject=user.toObject()
Reflect.deleteProperty(userObject,"password")
const accessToken= jwt.sign({id:user._id},process.env.JWT_SECRET,
   { expiresIn:"30 day",}
)

return res.status(201).json({user:userObject,accessToken,massage:"اطلاعات با موفقیت ثبت شد.",})
}
exports.login=async (req,res)=>{
const {identifier,password}=req.body
const user =await userModel.findOne({
    $or:[{email:identifier},{userName:identifier}],
});

if(!user){
    return res.status(401).json({
        message:"کاربری با این مشخصات یافت نشد."
    })
}
const isPasswordValid=await bcrypt.compare(password,user.password);

if(!isPasswordValid){
    return res.status(401).json({
        message:"رمز عبور اشتباه است."
    })
}

const accessToken=jwt.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn:"30 day"
});

return res.status(200).json({accessToken})

}
exports.getMe=async (req,res)=>{

}