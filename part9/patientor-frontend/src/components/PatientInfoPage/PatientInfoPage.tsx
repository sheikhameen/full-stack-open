import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import GenderIcon from "./GenderIcon";

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

export default PatientInfoPage;
