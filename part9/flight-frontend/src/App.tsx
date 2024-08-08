import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import DiaryEntries from "./components/DiaryEntries";
import { DiaryEntry } from "./types";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      setEntries(data);
    });
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;
