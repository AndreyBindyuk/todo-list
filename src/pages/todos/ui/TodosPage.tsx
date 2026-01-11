import { Container, Stack, Typography } from "@mui/material";

import { CreateTodoForm } from "@features/todo/create/ui/CreateTodoForm";
import { TodoList } from "@widgets/todo-list/ui/TodoList";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch";
import { addTodo } from "@entities/todo/model/slice";

export const TodosPage = () => {
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="h4">TODO List</Typography>
        </Stack>

        <CreateTodoForm onSubmit={(v) => dispatch(addTodo(v))} />
        <TodoList />
      </Stack>
    </Container>
  );
}
