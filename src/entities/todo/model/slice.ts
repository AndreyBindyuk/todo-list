import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import type { Todo, TodosState, TodoId } from "./types";

type AddTodoPayload = { title: string; description: string };
type UpdateTodoPayload = { id: TodoId; title: string; description: string };

const initialState: TodosState = { items: [] };

function now() {
  return Date.now();
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<AddTodoPayload>) => {
      const title = action.payload.title.trim();
      const description = action.payload.description.trim();

      const newTodo: Todo = {
        id: uuid(),
        title,
        description,
        completed: false,
        createdAt: now(),
        updatedAt: now(),
      };

      state.items.unshift(newTodo);
    },
    updateTodo: (state, action: PayloadAction<UpdateTodoPayload>) => {
      const t = state.items.find((x) => x.id === action.payload.id);
      if (!t) return;
      t.title = action.payload.title.trim();
      t.description = action.payload.description.trim();
      t.updatedAt = now();
    },
    deleteTodo: (state, action: PayloadAction<{ id: TodoId }>) => {
      state.items = state.items.filter((x) => x.id !== action.payload.id);
    },
    toggleTodo: (state, action: PayloadAction<{ id: TodoId }>) => {
      const t = state.items.find((x) => x.id === action.payload.id);
      if (!t) return;
      t.completed = !t.completed;
      t.updatedAt = now();
    },
    reorderTodos: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      if (from === to) return;
      if (from < 0 || to < 0 || from >= state.items.length || to >= state.items.length) return;

      const [moved] = state.items.splice(from, 1);
      state.items.splice(to, 0, moved);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo, reorderTodos } = todoSlice.actions;
export default todoSlice.reducer;
