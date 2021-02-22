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
      //Move inside 1 list
      if (destination.index === source.index) {
        return;
      } else {
        const list = data.lists.get(source.droppableId);
        if (list) {
          const taskId = Array.from(list.taskIds);
          taskId.splice(source.index, 1);
          taskId.splice(destination.index, 0, draggableId);

          data.lists.set(source.droppableId, {
            name: list.name,
            id: list.id,
            taskIds: taskId,
          });
          const map = new Map(lists);
          setData({ lists: map, tasks });
        }
      }
    } else {
      //Move from 1 list to another
      const startList = data.lists.get(source.droppableId);
      const finishList = data.lists.get(destination.droppableId);
      if (startList && finishList) {
        const startTaskIds = Array.from(startList.taskIds);
        const finishTaskIds = Array.from(finishList.taskIds);
        startTaskIds.splice(source.index, 1);
        finishTaskIds.splice(destination.index, 0, draggableId);
        data.lists.set(source.droppableId, {
          name: startList.name,
          id: startList.id,
          taskIds: startTaskIds,
        });
        data.lists.set(destination.droppableId, {
          name: finishList.name,
          id: finishList.id,
          taskIds: finishTaskIds,
        });
        const map = new Map(data.lists);
        setData({ lists: map, tasks });
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
