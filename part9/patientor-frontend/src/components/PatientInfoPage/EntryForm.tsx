import React, { useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";
import axios from "axios";
import toast from "react-hot-toast";

const EntryForm = ({
  addEntry,
}: {
  addEntry: (obj: EntryWithoutId) => Promise<void>;
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const rating: HealthCheckRating = parseInt(healthCheckRating);
    const diagnosisCodesArray: Array<Diagnosis["code"]> =
      diagnosisCodes.split(", ");

    try {
      await addEntry({
        type: "HealthCheck",
        date,
        description,
        specialist,
        healthCheckRating: rating,
        diagnosisCodes: diagnosisCodesArray,
      });

      toast.success("Entry added succesfully");
      setDescription("");
      setDate("");
      setSpecialist("");
      setSpecialist("");
      setHealthCheckRating("");
      setDiagnosisCodes("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data);
        }
      }
    }
  };

  return (
    <div style={{ borderRadius: 16, border: "2px dotted black", padding: 10 }}>
      <h3>New HealthCheck entry</h3>
      <form onSubmit={submit}>
        <div>
          Description:
          <input
            type="text"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          Date:
          <input
            type="text"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Specialist:
          <input
            type="text"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>
        <div>
          Health Check Rating:
          <input
            type="text"
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
        </div>
        <div>
          Diagnosis Codes:
          <input
            type="text"
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default EntryForm;
