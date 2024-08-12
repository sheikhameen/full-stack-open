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

const OccupationalHealthcareEntryForm = ({
  addEntry,
  diagnoses,
}: {
  addEntry: (obj: EntryWithoutId) => Promise<void>;
  diagnoses: Diagnosis[];
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [sickLeaveStartDate, setsickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      if (sickLeaveStartDate !== "" || sickLeaveEndDate !== "") {
        await addEntry({
          type: "OccupationalHealthcare",
          date,
          description,
          specialist,
          diagnosisCodes,
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
          diagnosisCodes,
          employerName,
        });
      }

      toast.success("Entry added succesfully");
      setDescription("");
      setDate("");
      setSpecialist("");
      setEmployerName("");
      setDiagnosisCodes([]);
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
      <h3>New OccupationalHealthcare entry</h3>
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
          label="Employer name"
          size="small"
          required
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />

        <TextField
          label="Sick leave start date"
          size="small"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={sickLeaveStartDate}
          onChange={({ target }) => setsickLeaveStartDate(target.value)}
        />

        <TextField
          label="Sick leave end date"
          size="small"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
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

export default OccupationalHealthcareEntryForm;
