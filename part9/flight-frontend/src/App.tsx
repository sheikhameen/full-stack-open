import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import DiaryEntries from "./components/DiaryEntries";
import { DiaryEntry } from "./types";
import DiaryForm from "./components/DiaryForm";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllEntries().then((data) => {
      setEntries(data);
    });
  }, []);

  const updateEntries = (newEntry: DiaryEntry) => {
    setEntries(entries.concat(newEntry));
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiaryForm updateEntries={updateEntries} />
      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;
