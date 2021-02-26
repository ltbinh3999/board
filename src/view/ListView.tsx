import React, { ReactElement, useContext } from "react";
import { DataContext, List } from "../data";
import TaskView from "./TaskView";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "../css/ListView.css";
interface Props {
  id: string;
  index: number;
  setF: any;
}
const width = "15vw";
export default function ListView({ id, index, setF }: Props): ReactElement {
  const data = useContext(DataContext);
  const listName = data.lists.get(id)?.name as string;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div
            style={{
              margin: "0 1vw 0 1vw",
            }}
          >
            <div
              {...provided.dragHandleProps}
              style={{
                width: width,
                height: "2vh",
                cursor: "pointer",
              }}
              onClick={() => {
                setF.setListId(id);
                setF.setIsList(true);
              }}
            >
              <div>{listName}</div>
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
                        setF.setIsAdd(true);
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
