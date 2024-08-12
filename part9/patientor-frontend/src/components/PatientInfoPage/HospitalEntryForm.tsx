import React, { useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";
import axios from "axios";
import toast from "react-hot-toast";

const HospitalEntryForm = ({
  addEntry,
}: {
  addEntry: (obj: EntryWithoutId) => Promise<void>;
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diagnosisCodesArray: Array<Diagnosis["code"]> =
      diagnosisCodes.split(", ");

    try {
      await addEntry({
        type: "Hospital",
        date,
        description,
        specialist,
        diagnosisCodes: diagnosisCodesArray,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      });

      toast.success("Entry added succesfully");
      setDescription("");
      setDate("");
      setSpecialist("");
      setDischargeDate("");
      setDischargeCriteria("");
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
      <h3>New Hospital entry</h3>
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
          Discharge date:
          <input
            type="text"
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
        </div>

        <div>
          Discharge criteria:
          <input
            type="text"
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default HospitalEntryForm;
