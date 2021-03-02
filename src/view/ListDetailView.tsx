import React, { ReactElement, useContext, useState } from "react";
import { DataContext } from "../data";
import closeButton from "../close.png";
interface Props {
  id: string;
  setF: any;
}

export default function ListDetailView({ id, setF }: Props): ReactElement {
  const data = useContext(DataContext);
  const t = data.lists.get(id);
  const [list, setList] = useState(t ? t : { id: "", name: "", taskIds: [] });
  const submit = () => {
    setF.listF(id, list);
    setF.setIsList(false);
  };

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
        src={closeButton}
        style={{
          height: "1em",
          display: "block",
          margin: "0 0 0 auto",
        }}
        onClick={() => {
          submit();
        }}
      />
      <input
        type="text"
        value={list.name}
        onChange={(e) => {
          const newList = { ...list };
          newList.name = e.target.value;
          setList(newList);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            submit();
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
