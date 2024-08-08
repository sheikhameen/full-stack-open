export interface DiaryEntry {
  id: number;
  date: string;
  weather: "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
  visibility: "great" | "good" | "ok" | "poor";
  comment: string;
}
