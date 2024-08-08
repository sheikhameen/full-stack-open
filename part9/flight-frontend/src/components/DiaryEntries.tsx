import { DiaryEntry } from "../types";

const DiaryEntries = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {entries.map((e) => (
        <div key={e.id}>
          <hr />
          <h3>{e.date}</h3>
          <p>Visibility: {e.visibility}</p>
          <p>Weather: {e.weather}</p>
          <p>
            <em>{e.comment}</em>
          </p>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
