import type { RootState } from "@app/store/store";

export const selectTodos = (s: RootState) => s.todo.items;
