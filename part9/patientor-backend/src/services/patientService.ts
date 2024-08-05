import patients from "../../data/patients";
import { Patient, PatientWithoutSSN } from "../types";

const getAllPatients = (): Patient[] => {
  return patients;
};

const getAllPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getAllPatients, getAllPatientsWithoutSSN };
