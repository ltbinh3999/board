import React from "react";
export interface Task {
  id: string;
  name: string;
  subTasks: string[];
  date?: Date;
}

export interface List {
  id: string;
  name: string;
  taskIds: string[];
}
export interface Board {
  id: string;
  name: string;
  listIds: string[];
  tasks: Map<string, Task>;
  lists: Map<string, List>;
}
//TODO: implement subtask Function
function getBoard(boardId: string) {
  const addSubTask = (taskId: string, subTasksId: string) => {
    tasks.get(taskId)?.subTasks.push(subTasksId);
  };
  const taskArr: Task[] = Array.from(Array(10).keys()).map((x) => ({
    id: x.toString(),
    name: `Sample task ${x}`,
    subTasks: [],
  }));
  const tasks = new Map<string, Task>();
  taskArr.forEach((x) => {
    tasks.set(x.id, x);
  });

  const lists = new Map<string, List>();
  lists.set("l0", {
    id: "l0",
    name: "Sample list 0",
    taskIds: ["0", "1", "2", "3"],
  });
  lists.set("l1", { id: "l1", name: "Sample list 1", taskIds: ["4", "5"] });
  lists.set("l2", {
    id: "l2",
    name: "Sample list 2",
    taskIds: ["6", "7", "8", "9"],
  });

  return {
    id: "b1",
    name: "Board 1",
    listIds: ["l0", "l1", "l2"],
    tasks,
    lists,
    taskIdC: tasks.size,
    listIdC: lists.size,
  };
}
const DataContext = React.createContext({
  lists: new Map<string, List>(),
  tasks: new Map<string, Task>(),
  taskIdC: 0,
  listIdC: 0,
});
const DataProvider = DataContext.Provider;
export { getBoard, DataContext, DataProvider };
