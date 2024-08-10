import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

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
  if (patient) {
    return res.send(patient);
  } else {
    return res.status(404).send("Patient not found");
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntryDetails = toNewEntry(req.body);
    const entry = patientService.addEntry(req.params.id, newEntryDetails);
    res.send(entry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
