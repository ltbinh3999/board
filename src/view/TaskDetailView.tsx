import React, { ReactElement, useContext, useState } from "react";
import { Task, DataContext } from "../data";

interface Props {
  id: string;
  setF: any;
}

export default function TaskDetailView({ id, setF }: Props): ReactElement {
  const data = useContext(DataContext);
  const t = data.tasks.get(id);
  const [task, setTask] = useState(t ? t : { name: "", subTasks: [] });
  const submit = () => {
    setF.taskF(id, task);
    setF.setTaskId("");
    setF.setListId("");
    setF.setIsAdd(false);
  };
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
          submit();
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
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            submit();
          }
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
