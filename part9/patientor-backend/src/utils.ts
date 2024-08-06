import { Gender, NewPatient } from "./types";

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const isDate = (text: string): boolean => {
  return Boolean(Date.parse(text));
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(text);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }
  return dateOfBirth;
};
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};
const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const toNewPatient = (body: unknown): NewPatient => {
  if (!body || typeof body !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in body &&
    "dateOfBirth" in body &&
    "ssn" in body &&
    "gender" in body &&
    "occupation" in body
  ) {
    const newPatient: NewPatient = {
      name: parseName(body.name),
      dateOfBirth: parseDateOfBirth(body.dateOfBirth),
      ssn: parseSSN(body.ssn),
      gender: parseGender(body.gender),
      occupation: parseOccupation(body.occupation),
    };
    return newPatient;
  } else {
    throw new Error("Incorrect data: some fields are missing");
  }
};

export default toNewPatient;
