/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState,useContext,useRef } from "react";
import { TodoContext } from "./TodoContext";
import { MdOutlineDone } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
  text: string;
  id: number;
}

export default function Task({ text,id }: Props) {
  const [input,setInput] = useState<string>("");
  const [isDoned,setISDoned] = useState<boolean>(false);
  const { dispatch } = useContext(TodoContext)!;
  const taskAreaRef = useRef<HTMLDivElement | null>(null);
  const changeTaskRef = useRef<HTMLDivElement | null>(null);
  const inputChangeRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={!isDoned ? "w-full h-14 flex flex-col items-center justify-center  p-4 bg-slate-200 text-black rounded-sm" : "w-full h-14 flex flex-col items-center justify-center  p-4 bg-emerald-600 text-white rounded-sm"}>
      <div
        ref={taskAreaRef}
        className="w-full flex items-center justify-between">
        <p
          onClick={() => {
            taskAreaRef.current!.style.display = "none";
            changeTaskRef.current!.style.display = "flex";
            inputChangeRef.current!.focus();
          }}
          className="font-medium">
          {text}
        </p>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setISDoned((previousValue) => !previousValue)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-400 text-white text-lg">
            <MdOutlineDone />
          </button>
          <button
            onClick={() => dispatch({ type: "DELETE",payload: id })}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-red-500 text-white text-lg">
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
      <div
        ref={changeTaskRef}
        className="w-full h-full hidden items-center justify-between gap-5">
        <input
          type="text"
          maxLength={20}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          ref={inputChangeRef}
          className="w-full h-10 bg-transparent border-b-2 border-slate-800 outline-none"
        />
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              dispatch({ type: "EDIT",payload: id,content: input });
              setISDoned(false);
              taskAreaRef.current!.style.display = "flex";
              changeTaskRef.current!.style.display = "none";
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-400 text-white text-lg">
            <MdOutlineDone />
          </button>
          <button
            onClick={() => {
              taskAreaRef.current!.style.display = "flex";
              changeTaskRef.current!.style.display = "none";
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-red-500 text-white text-lg">
            <IoIosCloseCircleOutline />
          </button>
        </div>
      </div>
    </div >
  );
}