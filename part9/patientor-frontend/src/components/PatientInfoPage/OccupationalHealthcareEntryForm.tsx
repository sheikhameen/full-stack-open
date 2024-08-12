import React, { useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";
import axios from "axios";
import toast from "react-hot-toast";

const OccupationalHealthcareEntryForm = ({
  addEntry,
}: {
  addEntry: (obj: EntryWithoutId) => Promise<void>;
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [sickLeaveStartDate, setsickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diagnosisCodesArray: Array<Diagnosis["code"]> =
      diagnosisCodes.split(", ");

    try {
      if (sickLeaveStartDate !== "" || sickLeaveEndDate !== "") {
        await addEntry({
          type: "OccupationalHealthcare",
          date,
          description,
          specialist,
          diagnosisCodes: diagnosisCodesArray,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        });
      } else {
        await addEntry({
          type: "OccupationalHealthcare",
          date,
          description,
          specialist,
          diagnosisCodes: diagnosisCodesArray,
          employerName,
        });
      }

      toast.success("Entry added succesfully");
      setDescription("");
      setDate("");
      setSpecialist("");
      setEmployerName("");
      setDiagnosisCodes("");
      setsickLeaveStartDate("");
      setSickLeaveEndDate("");
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
      <h3>New OccupationalHealthcare entry</h3>
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
          Employer name:
          <input
            type="text"
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
        </div>

        <div>
          Sick leave start date:
          <input
            type="text"
            value={sickLeaveStartDate}
            onChange={({ target }) => setsickLeaveStartDate(target.value)}
          />
        </div>

        <div>
          Sick leave end date:
          <input
            type="text"
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
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

export default OccupationalHealthcareEntryForm;
