import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const port = Number(process.env.PORT) || 3300;

app.get("/", (_req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`server run ${port}`);
});