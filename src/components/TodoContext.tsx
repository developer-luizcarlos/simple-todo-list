/* eslint-disable prefer-const */
"use client";

import React,{ useReducer,createContext,ReactNode } from "react";

type TodoType = {
  id: number;
  task: string;
  content?: string;
};

type Action = | { type: "ADD",payload: string; } | { type: "DELETE",payload: number; } | { type: "EDIT",payload: number,content: string; };

let initialState: TodoType[] = [];

const reducer = (state: TodoType[],action: Action) => {
  switch(action.type) {
    case "ADD":
      return [
        ...state,
        { id: state.length + 1,task: action.payload }
      ];
    case "EDIT":
      return state.map((element) => {
        if(element.id === action.payload) {
          return { ...element,task: action.content };
        } else {
          return element;
        }
      });
    case "DELETE":
      return state.filter((element) => element.id !== action.payload);
    default:
      return state;
  }
};

type ContextType = {
  state: TodoType[];
  dispatch: React.Dispatch<Action>;
};


export const TodoContext = createContext<ContextType | undefined>(undefined);

export default function TodoComponent({ children }: { children: ReactNode; }) {
  const [state,dispatch] = useReducer(reducer,initialState);

  return (
    <TodoContext.Provider value={{ state,dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}