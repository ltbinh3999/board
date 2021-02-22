import React, { ReactElement, useState } from "react";
import { DataProvider, getBoard } from "./data";
import ListView from "./ListView";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
interface Props {
  boardId: string;
}

export default function BoardView({ boardId }: Props): ReactElement {
  const { name, lists, tasks, listIds } = getBoard(boardId);
  const [data, setData] = useState({ lists, tasks });
  const listsViews = Array.from(lists.values(), (v, k) => (
    <ListView key={v.id} id={v.id} />
  ));
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) {
        return;
      } else {
        const list = data.lists.get(source.droppableId);
        if (list) {
          console.log(draggableId, source.index, destination.index);
          const taskId = Array.from(list.taskIds);
          console.log(taskId);
          taskId.splice(source.index, 1);
          console.log(taskId);
          taskId.splice(destination.index, 0, draggableId);
          console.log(taskId);

          lists.set(source.droppableId, {
            name: list.name,
            id: list.id,
            taskIds: taskId,
          });
          console.log(lists);
          const map = new Map(lists);
          setData({ lists: map, tasks });
        }
      }
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {
        <DataProvider value={data}>
          <DragDropContext onDragEnd={onDragEnd}>{listsViews}</DragDropContext>
        </DataProvider>
      }
    </div>
  );
}
