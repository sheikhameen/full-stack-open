import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          <em>{part.description}</em>
        </p>
      );
    case "background":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          <em>{part.description}</em> <br />
          Submit to: {part.backgroundMaterial}
        </p>
      );
    case "group":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          Project Exercises: {part.groupProjectCount}
        </p>
      );
    case "special":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          <em>{part.description}</em> <br />
          Required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      assertNever(part);
  }
};

export default Part;
