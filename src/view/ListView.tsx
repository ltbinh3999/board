import React, { ReactElement, useContext } from "react";
import { DataContext } from "../data";
import TaskView from "./TaskView";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "../css/ListView.css";
interface Props {
  id: string;
  index: number;
  setF: any;
}

export default function ListView({ id, index, setF }: Props): ReactElement {
  const data = useContext(DataContext);
  const listName = data.lists.get(id)?.name;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div
            style={{
              margin: "0 1vw 0 1vw",
              minWidth: "15vw",
            }}
          >
            <div
              {...provided.dragHandleProps}
              style={{ fontSize: "1.5em", textAlign: "center" }}
            >
              {listName}
            </div>
            <Droppable droppableId={id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    {data.lists.get(id)?.taskIds.map((x, i) => (
                      <TaskView
                        key={x}
                        id={x}
                        depth={0}
                        index={i}
                        setF={setF}
                        listId={id}
                      />
                    ))}
                    {provided.placeholder}
                    <div
                      className="AddTaskButton"
                      onClick={() => {
                        setF.setTaskId(data.taskIdC);
                        setF.setListId(id);
                      }}
                    >
                      <img
                        src="add.png"
                        alt="add button"
                        style={{
                          height: "1em",
                          width: "1em",
                          display: "block",
                          margin: "1vh auto 0 auto",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
}
