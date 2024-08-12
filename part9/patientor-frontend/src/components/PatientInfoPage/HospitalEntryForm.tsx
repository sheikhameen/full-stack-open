import React, { useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";
import axios from "axios";
import toast from "react-hot-toast";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function getStyles(name: string, selectedDiagnosisCodes: string[]) {
  return {
    fontWeight: selectedDiagnosisCodes.indexOf(name) === -1 ? "400" : "600",
  };
}

const HospitalEntryForm = ({
  addEntry,
  diagnoses,
}: {
  addEntry: (obj: EntryWithoutId) => Promise<void>;
  diagnoses: Diagnosis[];
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      await addEntry({
        type: "Hospital",
        date,
        description,
        specialist,
        diagnosisCodes,
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
      setDiagnosisCodes([]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data);
        }
      }
    }
  };

  const handleDiagnosesSelectChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div style={{ borderRadius: 16, border: "2px dotted black", padding: 10 }}>
      <h3>New Hospital entry</h3>
      <form
        onSubmit={submit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <TextField
          label="Description"
          size="small"
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          label="Date"
          size="small"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Specialist"
          size="small"
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <TextField
          label="Discharge date"
          size="small"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />

        <TextField
          label="Discharge criteria"
          size="small"
          required
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />

        <FormControl size="small">
          <InputLabel id="multiple-diagnosisCodes-label">
            Diagnosis Codes
          </InputLabel>
          <Select
            labelId="multiple-diagnosisCodes-label"
            id="multiple-diagnosisCodes"
            value={diagnosisCodes}
            multiple
            onChange={handleDiagnosesSelectChange}
            input={<OutlinedInput label="Diagnosis Codes" />}
          >
            {diagnoses.map((d) => (
              <MenuItem
                key={d.code}
                value={d.code}
                style={getStyles(d.code, diagnosisCodes)}
              >
                {d.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default HospitalEntryForm;
