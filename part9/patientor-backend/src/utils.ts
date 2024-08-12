import {
  Diagnosis,
  Entry,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  NewPatient,
} from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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

export const toNewPatient = (body: unknown): NewPatient => {
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

// -----------------------------------

const isEntryType = (value: string): value is Entry["type"] => {
  return ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(value);
};

const isDischarge = (obj: object): obj is HospitalEntry["discharge"] => {
  return (
    "date" in obj &&
    isString(obj.date) &&
    isDate(obj.date) &&
    "criteria" in obj &&
    isString(obj.criteria)
  );
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value);
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseDate = (parseDate: unknown): string => {
  if (!parseDate || !isString(parseDate) || !isDate(parseDate)) {
    throw new Error("Incorrect or missing date");
  }
  return parseDate;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const toNewEntry = (body: unknown): EntryWithoutId => {
  if (!body || typeof body !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("description" in body) ||
    !("date" in body) ||
    !("specialist" in body) ||
    !("type" in body)
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  if (!isString(body.type) || !isEntryType(body.type)) {
    throw new Error("Incorrect data: type is invalid");
  }

  const commonFields = {
    description: parseDescription(body.description),
    date: parseDate(body.date),
    specialist: parseName(body.specialist),
    diagnosisCodes: parseDiagnosisCodes(body),
  };

  switch (body.type) {
    case "Hospital":
      if (
        !("discharge" in body) ||
        !body.discharge ||
        typeof body.discharge !== "object" ||
        !isDischarge(body.discharge)
      )
        throw new Error(
          "Incorrect data: discharge field is missing or invalid in type Hospital"
        );

      return {
        ...commonFields,
        type: body.type,
        discharge: body.discharge,
      };

    case "OccupationalHealthcare":
      if (
        !("employerName" in body) ||
        !body.employerName ||
        !isString(body.employerName)
      )
        throw new Error(
          "Incorrect data: employerName field is missing or invalid in type OccupationalHealthcare"
        );

      if (
        "sickLeave" in body &&
        body.sickLeave &&
        typeof body.sickLeave === "object"
      ) {
        if (
          "startDate" in body.sickLeave &&
          isString(body.sickLeave.startDate) &&
          isDate(body.sickLeave.startDate) &&
          "endDate" in body.sickLeave &&
          isString(body.sickLeave.endDate) &&
          isDate(body.sickLeave.endDate)
        ) {
          return {
            ...commonFields,
            type: body.type,
            employerName: body.employerName,
            sickLeave: {
              startDate: body.sickLeave.startDate,
              endDate: body.sickLeave.endDate,
            },
          };
        }

        throw new Error(
          "Incorrect data: sick leave start/end date missing or invalid. Omit both fields to not add a sickLeave field."
        );
      }

      return {
        ...commonFields,
        type: body.type,
        employerName: body.employerName,
      };
    case "HealthCheck":
      if (
        !("healthCheckRating" in body) ||
        !body.healthCheckRating ||
        typeof body.healthCheckRating !== "number" ||
        !isHealthCheckRating(body.healthCheckRating)
      ) {
        throw new Error(
          "Incorrect data: healthCheckRating field is missing or invalid in type HealthCheck"
        );
      }

      return {
        ...commonFields,
        type: body.type,
        healthCheckRating: body.healthCheckRating,
      };
    default:
      return assertNever(body.type);
  }
};
