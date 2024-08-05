import express from "express";
import cors from "cors";

import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));

app.use("/api/diagnoses", diagnosesRouter);

app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, res) => {
  return res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
