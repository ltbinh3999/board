import React, { ReactElement, useContext, useState } from "react";
import { DataContext } from "../data";
import closeButton from "../close.png";

interface Props {
  id: string;
  setF: any;
}

export default function TaskDetailView({ id, setF }: Props): ReactElement {
  const data = useContext(DataContext);
  const t = data.tasks.get(id);
  const [task, setTask] = useState(
    t ? t : { name: "", subTasks: [], date: new Date() }
  );
  const [isDate, setIsDate] = useState(false);
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
        src={closeButton}
        style={{
          height: "1em",
          display: "block",
          margin: "0 0 0 auto",
        }}
        onClick={() => {
          submit();
        }}
      />
      <div>
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
      </div>
      <div>
        <input
          type="date"
          value={task.date?.toISOString().substring(0, 10)}
          onChange={(e) => {
            const newTask = { ...task };
            newTask.date = new Date(e.target.value);
            setTask(newTask);
            setF.taskF(id, newTask);
          }}
        ></input>
      </div>
      <div>
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
    </div>
  );
}
