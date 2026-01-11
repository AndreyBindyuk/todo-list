export type TodoId = string;

export type Todo = {
  id: TodoId;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};

export type TodosState = {
  items: Todo[];
};
