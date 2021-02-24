import React, { ReactElement, useContext } from "react";
import { Task, DataContext } from "../data";

interface Props {
  id: string;
  setF: any;
}

export default function TaskDetailView({ id, setF }: Props): ReactElement {
  const data = useContext(DataContext);
  const task = data.tasks.get(id);

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        width: "50vw",
        height: "50vh",
        position: "fixed",
        top: "50vh",
        left: "50vw",
        margin: "-25vh 0 0 -25vw",
      }}
    >
      <input
        type="image"
        src="close.png"
        style={{
          height: "1em",
          display: "block",
          margin: "0 0 0 auto",
        }}
        onClick={() => {
          setF.setTaskId("");
        }}
      />
      <div>Task name: {task?.name}</div>
      <div>Sub tasks: {JSON.stringify(task?.subTasks)}</div>
    </div>
  );
}
