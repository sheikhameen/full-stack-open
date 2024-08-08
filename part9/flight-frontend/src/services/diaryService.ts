import axios from "axios";
import { DiaryEntry } from "../types";

const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(
    "http://localhost:3000/api/diaries"
  );

  return response.data;
};

export default { getAllDiaries };
