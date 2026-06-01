import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port: number = 3300;

console.log("server start:", port);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`server run ${port}`);
});