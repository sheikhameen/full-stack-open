import { useState } from "react";
import diaryService from "../services/diaryService";
import { DiaryEntry } from "../types";
import axios from "axios";

const DiaryForm = ({
  updateEntries,
}: {
  updateEntries: (newEntry: DiaryEntry) => void;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      console.log({ date, comment, visibility, weather });
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
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        typeof error.response.data === "string"
      ) {
        console.log(error.response);
        showError(error.response.data);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div style={{ color: "red" }}>{error}</div>
      <form onSubmit={submit}>
        <div>
          Date:
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Visibility:
          {["great", "good", "ok", "poor"].map((v) => (
            <span key={v}>
              <label htmlFor={v}>{v}</label>
              <input
                type="radio"
                name="visibility"
                id={v}
                checked={v === visibility}
                value={v}
                onChange={({ target }) => setVisibility(target.value)}
              />
            </span>
          ))}
        </div>
        <div>
          <div>
            Weather:
            {["sunny", "rainy", "cloudy", "stormy", "windy"].map((w) => (
              <span key={w}>
                <label htmlFor={w}>{w}</label>
                <input
                  type="radio"
                  name="weather"
                  id={w}
                  checked={w === weather}
                  value={w}
                  onChange={({ target }) => setWeather(target.value)}
                />
              </span>
            ))}
          </div>
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
