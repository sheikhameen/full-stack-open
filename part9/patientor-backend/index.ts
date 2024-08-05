import express from "express";
const app = express();

app.get("/api/ping", (_req, res) => {
  return res.send("pong");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
