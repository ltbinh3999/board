import React, { ReactElement } from "react";
import { DataProvider, getBoard } from "./data";
import ListView from "./ListView";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
interface Props {
  boardId: string;
}

export default function BoardView({ boardId }: Props): ReactElement {
  const { name, lists, tasks, listIds } = getBoard(boardId);
  const listsViews = Array.from(lists.values(), (v, k) => (
    <ListView key={v.id} id={v.id} />
  ));
  const onDragEnd = () => {
    console.log("end");
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {
        <DataProvider value={{ lists, tasks }}>
          <DragDropContext onDragEnd={onDragEnd}>{listsViews}</DragDropContext>
        </DataProvider>
      }
    </div>
  );
}
