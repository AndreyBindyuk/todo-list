import type { TodosState } from "./types";

const STORAGE_KEY = "todos";

export function loadTodoState(): TodosState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as TodosState;
    }
  } catch (e) {
    console.error("Failed to load todo state from localStorage", e);
  }
  return undefined;
}

export function saveTodoState(state: TodosState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save todo state to localStorage", e);
  }
}
