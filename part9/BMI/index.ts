import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    height,
    weight,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // Verify parameters exist in body
  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  // Verify target is a number
  if (typeof target !== "number") {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // Verify daily_exercises is an array, and every item is a number
  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((hour) => typeof hour === "number")
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // Calculate
  const calculated = calculateExercises(daily_exercises, target);

  return res.json(calculated);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
