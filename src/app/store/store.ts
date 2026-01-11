import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@entities/todo/model/slice";
import { loadTodoState, saveTodoState } from "@entities/todo/model/persist";

const preloaded = loadTodoState();

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: preloaded ? { todo: preloaded } : undefined,
});

store.subscribe(() => {
  saveTodoState(store.getState().todo);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
