const app = require("./app");
require("dotenv").config();

const port = 3300;

console.log("server start:", port);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`server run ${port}`);
});