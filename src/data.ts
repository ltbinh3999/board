export interface Task {
  name: string;
  subTasks?: Task[];
  date?: Date;
}
export interface List {
  name: string;
  data: Task[];
}
export interface Board {
  name: string;
  data: List[];
}
function getList(): List {
  return {
    name: "Sample List",
    data: [
      { name: "Task 1" },
      { name: "Task 2", subTasks: [{ name: "Task 4" }, { name: "Task 5" }] },
      {
        name: "Task 3",
        subTasks: [{ name: "Task 6", subTasks: [{ name: "Task 7" }] }],
      },
    ],
  };
}
function getBoard(): Board {
  return {
    name: "Sample Board",
    data: [getList(), getList(), getList()],
  };
}
export { getBoard, getList };
