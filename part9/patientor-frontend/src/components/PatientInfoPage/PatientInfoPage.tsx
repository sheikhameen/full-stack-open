import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, EntryWithoutId, Patient } from "../../types";
import EntryDetails from "./EntryDetails";
import GenderIcon from "./GenderIcon";
import axios from "axios";
import toast from "react-hot-toast";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";
import { Close } from "@mui/icons-material";

const PatientInfoPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [currentEntryForm, setCurrentEntryForm] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare" | null
  >(null);

  useEffect(() => {
    if (!id) return;

    const getPatient = async () => {
      try {
        const data = await patientService.getOne(id);
        setPatient(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data);
        }
      }
    };
    getPatient();
  }, [id]);

  const addEntryToPatient = async (obj: EntryWithoutId) => {
    if (!id) return;

    const addedEntry = await patientService.addEntry(id, obj);

    if (patient) {
      setPatient({ ...patient, entries: patient.entries.concat(addedEntry) });
    }
  };

  if (!patient) return null;

  return (
    <div>
      <h2>
        {patient.name} <GenderIcon gender={patient.gender} />{" "}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <div style={{ display: "flex", height: "40px" }}>
        <button
          style={{
            borderRadius: "10px 10px 0 0",
            backgroundColor: "#0277bd",
            borderWidth: 1,
            color: "white",
          }}
          onClick={() => setCurrentEntryForm("HealthCheck")}
        >
          Show Healthcheck Entry form
        </button>
        <button
          style={{
            borderRadius: "10px 10px 0 0",
            backgroundColor: "#0277bd",
            borderWidth: 1,
            color: "white",
          }}
          onClick={() => setCurrentEntryForm("Hospital")}
        >
          Show Hospital Entry form
        </button>
        <button
          style={{
            borderRadius: "10px 10px 0 0",
            backgroundColor: "#0277bd",
            borderWidth: 1,
            color: "white",
          }}
          onClick={() => setCurrentEntryForm("OccupationalHealthcare")}
        >
          Show Occupational Healthcare Entry form
        </button>
        <button
          style={{
            display: currentEntryForm ? "inline-block" : "none",

            borderRadius: "10px",
            backgroundColor: "#ef5350",
            borderWidth: 0,
            color: "white",
          }}
          onClick={() => setCurrentEntryForm(null)}
        >
          <Close />
        </button>
      </div>
      {currentEntryForm === "HealthCheck" && (
        <HealthCheckEntryForm
          diagnoses={diagnoses}
          addEntry={addEntryToPatient}
        />
      )}
      {currentEntryForm === "Hospital" && (
        <HospitalEntryForm diagnoses={diagnoses} addEntry={addEntryToPatient} />
      )}
      {currentEntryForm === "OccupationalHealthcare" && (
        <OccupationalHealthcareEntryForm
          diagnoses={diagnoses}
          addEntry={addEntryToPatient}
        />
      )}
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
