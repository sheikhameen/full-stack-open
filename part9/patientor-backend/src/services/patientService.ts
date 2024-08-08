import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, Patient, NonSensitivePatient } from "../types";

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

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  getPatient,
  addPatient,
};
