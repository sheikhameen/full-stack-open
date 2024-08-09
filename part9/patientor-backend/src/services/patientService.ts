import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  NewPatient,
  Patient,
  NonSensitivePatient,
  EntryWithoutId,
  Entry,
} from "../types";

const getAllPatients = (): Patient[] => {
  return patients;
};

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (
  patientId: string,
  newEntryDetails: EntryWithoutId
): Entry => {
  const patient = patients.find((p) => p.id === patientId);

  if (patient) {
    const newEntry = {
      ...newEntryDetails,
      id: uuid(),
    };
    patient.entries = patient.entries.concat(newEntry);

    return newEntry;
  } else {
    throw new Error("Patient not found");
  }
};

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry,
};
