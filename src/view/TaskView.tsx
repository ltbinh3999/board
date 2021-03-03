import React, { ReactElement, useContext } from "react";
import { DataContext } from "../data";
import { Draggable } from "react-beautiful-dnd";
import checkMark from "../check-mark.png";
import "../css/ImageButton.css";
interface Props {
  id: string;
  depth: number;
  index: number;
  setF: any;
  listId: string;
}
export default function TaskView({
  id,
  depth,
  index,
  setF,
  listId,
}: Props): ReactElement {
  const data = useContext(DataContext);
  const task = data.tasks.get(id);
  const subTaskViews = task?.subTasks.map((x, i) => (
    <TaskView
      key={x}
      id={x}
      depth={depth + 1}
      index={i}
      setF={setF}
      listId={listId}
    />
  ));
  const taskInfo = (
    <div>
      <div>
        <input
          className="ImageButton"
          type="image"
          src={checkMark}
          style={{ height: "1em" }}
          onClick={(e) => {
            e.stopPropagation();
            setF.taskF(id);
            setF.setTaskId("");
          }}
        ></input>
        <span style={{ marginLeft: "5%" }}>{task?.name}</span>
      </div>
      <div>{task?.date?.toDateString()}</div>
    </div>
  );
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
                marginTop: "1vh",
                cursor: "pointer",
              }}
              onClick={() => {
                setF.setTaskId(id);
                setF.setListId(listId);
              }}
            >
              {taskInfo}
            </div>
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <div style={{ marginLeft: depth * 10 }}>
        {taskInfo}
        {subTaskViews}
      </div>
    );
  }
}
