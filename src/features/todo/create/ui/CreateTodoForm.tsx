import { useMemo, useState } from "react";

import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

type Props = {
  onSubmit: (v: { title: string; description: string }) => void;
};

export const CreateTodoForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = useMemo(() => title.trim().length > 0, [title]);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Create TODO</Typography>

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={3}
          />

          <Box>
            <Button
              variant="contained"
              onClick={() => {
                if (!canSubmit) return;
                onSubmit({ title, description });
                setTitle("");
                setDescription("");
              }}
              disabled={!canSubmit}
            >
              Add
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
