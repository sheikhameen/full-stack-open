interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  targetHours: number
): Result => {
  const average =
    dailyExerciseHours.reduce((prev, curr) => prev + curr) /
    dailyExerciseHours.length;

  let rating = 0;
  let ratingDescription = "";
  if (average < targetHours / 2) {
    rating = 1;
    ratingDescription = "Very bad.";
  } else if (average < targetHours) {
    rating = 2;
    ratingDescription = "Not bad, but could be better.";
  } else {
    rating = 3;
    ratingDescription = "Very good! Keep it up!.";
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((h) => h > 0).length,
    success: average > targetHours,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const targetHours = 2;

console.log(calculateExercises(dailyExerciseHours, targetHours));
