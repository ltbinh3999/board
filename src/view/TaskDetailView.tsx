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
        marginLeft: "-25vw",
        marginTop: "-25vh",
      }}
    >
      <input
        type="image"
        src="close.png"
        style={{
          height: "1em",
          display: "block",
          marginLeft: "auto",
          marginRight: "0",
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
