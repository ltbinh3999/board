import React, { ReactElement, useContext, useState } from "react";
import { Task, DataContext } from "../data";

interface Props {
  id: string;
  setF: any;
  isAdd: string;
}

export default function TaskDetailView({
  id,
  setF,
  isAdd,
}: Props): ReactElement {
  const data = useContext(DataContext);
  const t = data.tasks.get(id);
  const [task, setTask] = useState(t ? t : { name: "", subTasks: [] });

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
          setF.taskF(id, task);
          setF.setTaskId("");
        }}
      />
      <input
        type="text"
        value={task.name}
        onChange={(e) => {
          const newtask = { ...task };
          newtask.name = e.target.value;
          setTask(newtask);
        }}
      />
      {t && (
        <button
          onClick={() => {
            setF.taskF(id);
            setF.setTaskId("");
          }}
        >
          DELETE
        </button>
      )}
    </div>
  );
}
