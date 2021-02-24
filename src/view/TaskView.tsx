import React, { ReactElement, useContext } from "react";
import { DataContext } from "../data";
import { Draggable } from "react-beautiful-dnd";
interface Props {
  id: string;
  depth: number;
  index: number;
  setF: any;
}
export default function TaskView({
  id,
  depth,
  index,
  setF,
}: Props): ReactElement {
  const data = useContext(DataContext);
  const task = data.tasks.get(id);
  const subTaskViews = task?.subTasks.map((x, i) => (
    <TaskView key={x} id={x} depth={depth + 1} index={i} setF={setF} />
  ));
  if (depth === 0) {
    return (
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              style={{
                border: "1px solid black ",
                padding: "5px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setF.setTaskId(id);
              }}
            >
              {task?.name}
              {subTaskViews}
            </div>
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <div style={{ marginLeft: depth * 10 }}>
        {task?.name}
        {subTaskViews}
      </div>
    );
  }
}
