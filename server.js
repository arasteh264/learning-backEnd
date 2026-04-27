const app=require("./app");
const mongoose=require("mongoose");
require("dotenv").config();

const port=3300;
console.log(port);
(async ()=>{
try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to DB");
} catch (err) {
  console.error("DB connection error:", err);
}
})();
console.log("JWT:", process.env.JWT_SECRET);
app.get("/", (req, res) => {
    console.log("header", req.header("Authorization").split(" ")[1]);
    res.json({ message: "ok" });
});
app.listen(port,()=>{
    console.log(`server run ${port}`)
})