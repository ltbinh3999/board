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

function getBoard(boardId: string) {
  const addSubTask = (taskId: string, subTasksId: string) => {
    tasks.get(taskId)?.subTasks.push(subTasksId);
  };
  const taskArr: Task[] = Array.from(Array(15).keys()).map((x) => ({
    id: x.toString(),
    name: `task${x}`,
    subTasks: [],
  }));
  const tasks = new Map<string, Task>();
  taskArr.forEach((x) => {
    tasks.set(x.id, x);
  });
  addSubTask("0", "1");
  addSubTask("0", "2");
  addSubTask("0", "3");
  addSubTask("1", "4");
  addSubTask("1", "5");
  addSubTask("6", "7");
  const lists = new Map<string, List>();
  lists.set("l0", {
    id: "l0",
    name: "List 0",
    taskIds: ["0", "9", "10", "11"],
  });
  lists.set("l1", { id: "l1", name: "List 1", taskIds: ["6", "8"] });
  lists.set("l2", { id: "l2", name: "List 2", taskIds: ["12", "13", "14"] });

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
