import { isNumber } from "./utils";

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

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNumber(args[2])) {
    throw new Error(
      `${args[2]} is not a number. Target hours must be a number!`
    );
  }

  const hoursArray = args.slice(3);
  const hours = hoursArray.map((h) => {
    if (!isNumber(h)) {
      throw new Error(`${h} is not a number. Daily hours must be numbers!`);
    }
    return Number(h);
  });

  return {
    target: Number(args[2]),
    hours,
  };
};

try {
  const { hours, target } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
