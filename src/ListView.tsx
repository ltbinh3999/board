import React, { ReactElement, useContext } from "react";
import { DataContext } from "./data";
import TaskView from "./TaskView";
import { Droppable, Draggable } from "react-beautiful-dnd";
interface Props {
  id: string;
}

export default function ListView({ id }: Props): ReactElement {
  const data = useContext(DataContext);
  const listName = data.lists.get(id)?.name;
  const taskViews = data.lists
    .get(id)
    ?.taskIds.map((x, i) => <TaskView key={x} id={x} depth={0} index={i} />);

  return (
    <div>
      <div style={{ fontSize: "1.5em" }}>{listName}</div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {taskViews}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
