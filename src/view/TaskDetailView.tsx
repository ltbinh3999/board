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
  const task = data.tasks.get(id);
  const [taskName, setTaskName] = useState(isAdd !== "" ? "" : task?.name);
  const addTask = () => {
    const task = {
      name: taskName as string,
      subTasks: [],
      id: (data.taskIdCounter + 1).toString() as string,
    };
    data.taskF(task, "add");
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
          setF.setTaskId("");
        }}
      />
      <div>
        <input
          type="text"
          name=""
          id=""
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
        {isAdd && <button onClick={addTask}>Add</button>}
      </div>
    </div>
  );
}
