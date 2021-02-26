import React, { ReactElement, useState, useEffect } from "react";
import { DataProvider, getBoard, List, Task } from "../data";
import ListView from "./ListView";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import TaskDetailView from "./TaskDetailView";
interface Props {
  boardId: string;
}

export default function BoardView({ boardId }: Props): ReactElement {
  useEffect(() => {
    const { name, lists, tasks, listIds, listIdC, taskIdC } = getBoard(boardId);
    setData({ lists, tasks, listIds });
    setTaskIdC(taskIdC);
    setListIdC(listIdC);
  }, []);
  const [data, setData] = useState({
    lists: new Map<string, List>(),
    tasks: new Map<string, Task>(),
    listIds: new Array<string>(),
  });
  const [taskId, setTaskId] = useState("");
  const [listId, setListId] = useState("");
  const [taskIdC, setTaskIdC] = useState(0);
  const [listIdC, setListIdC] = useState(0);
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "column") {
      const listId = Array.from(data.listIds);
      listId.splice(source.index, 1);
      listId.splice(destination.index, 0, draggableId);

      setData({ lists: data.lists, tasks: data.tasks, listIds: listId });
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
          const map = new Map(data.lists);
          setData({ lists: map, tasks: data.tasks, listIds: data.listIds });
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
        setData({ lists: map, tasks: data.tasks, listIds: data.listIds });
      }
    }
  };
  function taskF(id: string, task?: Task) {
    const tasks = new Map(data.tasks);
    const lists = new Map(data.lists);
    if (task) {
      tasks.set(id.toString(), task);
      if (listId !== "") {
        lists.get(listId)?.taskIds.push(id.toString());
        setTaskIdC((taskIdC) => taskIdC + 1);
      }
    } else {
      tasks.delete(id);
      const list = lists.get(listId)?.taskIds as string[];
      list.splice(list.indexOf(id), 1);
    }

    setData({ tasks, lists, listIds: data.listIds });
  }
  const setF = { setTaskId, taskF, setListId };

  return (
    <div>
      <DataProvider value={{ ...data, taskIdC, listIdC }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all" direction="horizontal" type="column">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {data.listIds.map((x, i) => (
                    <ListView key={x} id={x} index={i} setF={setF} />
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {taskId !== "" && <TaskDetailView id={taskId} setF={setF} />}
      </DataProvider>
    </div>
  );
}
