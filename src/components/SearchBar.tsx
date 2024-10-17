"use client";
import { useState,useContext,useRef } from "react";
import { TodoContext } from "./TodoContext";

export default function SearchBar() {
  const [input,setInput] = useState<string>("");
  const { dispatch } = useContext(TodoContext)!;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTask = () => {
    if(input.trim()) {
      dispatch({ type: "ADD",payload: input });
      setInput("");
      inputRef.current!.focus();
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-3">
      <input
        type="text"
        value={input}
        ref={inputRef}
        placeholder="Digite uma tarefa"
        maxLength={20}
        autoCapitalize="words"
        onChange={(event) => setInput(event.target.value)}
        className="w-full h-10 border-2 border-violet-700 rounded-md outline-violet-400 p-2"
      />
      <button
        onClick={() => addTask()}
        className="w-44 h-10 rounded-md flex items-center justify-center bg-violet-900 text-white font-medium duration-200 ease-in-out hover:bg-violet-600"
      >Adicionar</button>
    </div>
  );
}