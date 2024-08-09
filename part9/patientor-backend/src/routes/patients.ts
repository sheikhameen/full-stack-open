import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientService.getAllNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientDetails = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatientDetails);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  return res.send(patient);
});

router.post("/:id/entries", (req, res) => {
  // const patient = patientService.getPatient(req.params.id);
  // return res.send(patient);
  res.send("hello");
});

export default router;
