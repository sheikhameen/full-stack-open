import {
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Diagnosis,
} from "../../types";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import { LocalHospital } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

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

export default EntryDetails;
