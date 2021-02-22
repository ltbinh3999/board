import React, { ReactElement, useContext } from "react";
import { DataContext } from "./data";

interface Props {
  id: string;
  depth: number;
}

export default function TaskView({ id, depth }: Props): ReactElement {
  const data = useContext(DataContext);
  const task = data.tasks.get(id);
  if (task) {
    const { name, subTasks } = task;
    const subTaskViews = subTasks.map((x) => (
      <TaskView key={x} id={x} depth={depth + 1} />
    ));
    return (
      <div
        style={{
          marginLeft: depth * 10,
          border: depth === 0 ? "1px black solid" : "",
        }}
      >
        <div>{name}</div>
        <div>{subTaskViews}</div>
      </div>
    );
  }
  return <div></div>;
}
