import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { selectTodos } from "@entities/todo/model/selectors";
import { reorderTodos } from "@entities/todo/model/slice";
import { TodoItem } from "@entities/todo/ui/TodoItem";

import { SortableTodoRow } from "./SortableTodoRow";

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "done" | "todo">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todos.filter((t) => {
      const matchesQuery = q.length === 0 || t.title.toLowerCase().includes(q);
      const matchesStatus =
        status === "all" ||
        (status === "done" && t.completed) ||
        (status === "todo" && !t.completed);
      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    // allow ordering only when list is not filtered
    if (query.trim() !== "" || status !== "all") return;

    const from = filtered.findIndex((t) => t.id === active.id);
    const to = filtered.findIndex((t) => t.id === over.id);
    if (from === -1 || to === -1) return;

    dispatch(reorderTodos({ from, to }));
  };

  const sortableIds = filtered.map((t) => t.id);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Todos</Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Search by title"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
            />

            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="todo">Incomplete</MenuItem>
                <MenuItem value="done">Complete</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {(query.trim() !== "" || status !== "all") && (
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Drag & Drop ordering is available only in "All" view without
              search/filter.
            </Typography>
          )}

          {filtered.length === 0 ? (
            <Typography sx={{ opacity: 0.7 }}>No TODO items yet.</Typography>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={sortableIds}
                strategy={verticalListSortingStrategy}
              >
                <Stack spacing={2}>
                  {filtered.map((t) => (
                    <SortableTodoRow key={t.id} id={t.id}>
                      <TodoItem todo={t} />
                    </SortableTodoRow>
                  ))}
                </Stack>
              </SortableContext>
            </DndContext>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
