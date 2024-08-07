import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </>
  );
};

export default Content;
