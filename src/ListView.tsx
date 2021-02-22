import React, { ReactElement, useContext } from "react";
import { DataContext } from "./data";
import TaskView from "./TaskView";

interface Props {
  id: string;
}

export default function ListView({ id }: Props): ReactElement {
  const data = useContext(DataContext);
  const listName = data.lists.get(id)?.name;
  const taskViews = data.lists
    .get(id)
    ?.taskIds.map((x) => <TaskView key={x} id={x} depth={0} />);
  return (
    <div>
      <div>{listName}</div>
      <div>{taskViews}</div>
    </div>
  );
}
