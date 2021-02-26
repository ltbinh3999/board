import React, { ReactElement, useContext, useState } from "react";
import { DataContext } from "../data";

interface Props {
  id: string;
  setF: any;
}
//FIXME: Refactor this and TaskDetailView to a DetailView component.
export default function ListDetailView({ id, setF }: Props): ReactElement {
  const data = useContext(DataContext);
  const t = data.lists.get(id);
  const [task, setTask] = useState(t ? t : { id: "", name: "", taskIds: [] });
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        width: "50vw",
        height: "50vh",
        position: "fixed",
        top: "50vh",
        left: "50vw",
        margin: "-25vh 0 0 -25vw",
      }}
    >
      <input
        type="image"
        src="close.png"
        style={{
          height: "1em",
          display: "block",
          margin: "0 0 0 auto",
        }}
        onClick={() => {}}
      />
      <input
        type="text"
        value={1}
        onChange={(e) => {}}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
          }
        }}
      />
      {t && (
        <button
          onClick={() => {
            setF.setIsList(false);
            setF.listF(id);
          }}
        >
          DELETE
        </button>
      )}
    </div>
  );
}
