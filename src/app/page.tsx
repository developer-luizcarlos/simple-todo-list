"use client";
import SearchBar from "@/components/SearchBar";
import Task from "@/components/Task";
import { useContext } from "react";
import { TodoContext } from "@/components/TodoContext";

export default function Home() {
  const { state } = useContext(TodoContext)!;

  return (
    <div className="w-[450px] flex flex-col gap-5">
      <SearchBar />
      {state.map((element) => {
        return <Task text={element.task} id={element.id} key={element.id} />;
      })}
    </div>
  );
}