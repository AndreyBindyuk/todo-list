import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import type { Todo } from "@entities/todo/model/types";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch";
import { deleteTodo, toggleTodo, updateTodo } from "@entities/todo/model/slice";

export function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const canSave = title.trim().length > 0;

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
            <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
              <Checkbox
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo({ id: todo.id }))}
              />
              {!isEditing ? (
                <Typography
                  variant="subtitle1"
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    opacity: todo.completed ? 0.6 : 1,
                    wordBreak: "break-word",
                  }}
                >
                  {todo.title}
                </Typography>
              ) : (
                <TextField
                  size="small"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                />
              )}
            </Stack>

            <Stack direction="row" gap={1} flexShrink={0}>
              {!isEditing ? (
                <>
                  <IconButton onClick={() => setIsEditing(true)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => dispatch(deleteTodo({ id: todo.id }))}
                    aria-label="delete"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    onClick={() => {
                      if (!canSave) return;
                      dispatch(updateTodo({ id: todo.id, title, description }));
                      setIsEditing(false);
                    }}
                    aria-label="save"
                    disabled={!canSave}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setTitle(todo.title);
                      setDescription(todo.description);
                      setIsEditing(false);
                    }}
                    aria-label="cancel"
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              )}
            </Stack>
          </Stack>

          {isEditing ? (
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={2}
            />
          ) : (
            todo.description && (
              <Typography variant="body2" sx={{ opacity: 0.8, whiteSpace: "pre-wrap" }}>
                {todo.description}
              </Typography>
            )
          )}

          <Divider />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", opacity: 0.7 }}>
            <Typography variant="caption">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="caption">
              Updated: {new Date(todo.updatedAt).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
