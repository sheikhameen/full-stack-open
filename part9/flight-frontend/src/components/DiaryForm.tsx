import { useState } from "react";
import diaryService from "../services/diaryService";
import { DiaryEntry } from "../types";

const DiaryForm = ({
  updateEntries,
}: {
  updateEntries: (newEntry: DiaryEntry) => void;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = await diaryService.createEntry({
      date,
      comment,
      visibility,
      weather,
    });
    updateEntries(newEntry);

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          Date:
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Visibility:
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          Weather:
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          Comment:
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
