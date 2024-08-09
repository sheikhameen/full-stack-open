import patientService from "../services/patients";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
} from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import { LocalHospital } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const PatientInfoPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((data) => setPatient(data));
    }
  });

  if (!patient) return null;

  return (
    <div>
      <h2>
        {patient.name} <GenderIcon gender={patient.gender} />{" "}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map((e) => (
        <div
          key={e.id}
          style={{
            border: "2px black solid",
            padding: 10,
            marginBottom: 6,
            borderRadius: 20,
          }}
        >
          <EntryDetails entry={e} diagnoses={diagnoses} />
        </div>
      ))}
    </div>
  );
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryComponent
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    default:
      assertNever(entry);
  }
};

const HospitalEntryComponent = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <>
      <p>
        {entry.date} <LocalHospital />
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((c) => (
            <li key={c}>
              {c}: {diagnoses.find((d) => d.code === c)?.name}
            </li>
          ))}
      </ul>
      <p>Diagnosed by {entry.specialist}</p>
    </>
  );
};

const HealthCheckEntryComponent = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <>
      <p>
        {entry.date} <MedicalServicesIcon />
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((c) => (
            <li key={c}>
              {c}: {diagnoses.find((d) => d.code === c)?.name}
            </li>
          ))}
      </ul>
      <div>
        <HealthIcon health={entry.healthCheckRating} />
      </div>
      <p>Diagnosed by {entry.specialist}</p>
    </>
  );
};

const OccupationalHealthcareEntryComponent = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <>
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <p>
        <em>{entry.description}</em>
      </p>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((c) => (
            <li key={c}>
              {c}: {diagnoses.find((d) => d.code === c)?.name}
            </li>
          ))}
      </ul>
      <p>Diagnosed by {entry.specialist}</p>
    </>
  );
};

const GenderIcon = ({ gender }: { gender: string }) => {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    default:
      return <PersonIcon />;
  }
};

const HealthIcon = ({ health }: { health: HealthCheckRating }) => {
  switch (health) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ fill: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ fill: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ fill: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ fill: "red" }} />;
    default:
      assertNever(health);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default PatientInfoPage;
