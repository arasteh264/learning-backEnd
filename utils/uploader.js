const path=require("path");
const multer=require("multer");
const crypto=require("crypto")
module.exports=multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,path.join(__dirname,"..","public","courses","covers"))
    },
    filename:(req,file,cb)=>{

const filename=Date.now()+String(Math.random()*9999)
console.log("fileName",filename);

// const filename=crypto.createHash("SHA2").update(file.originalname).digest("hex")
const ext=path.extname(file.originalname)
cb(null,filename,ext)
    }
})