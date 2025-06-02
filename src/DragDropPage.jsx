// DragDropPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Grid
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const DragDropPage = ({
  question,
  current,
  total,
  submitted,
  isCorrect,
  showExplanation,
  onSubmitAnswer,
  onShowExplanation,
  onPrev,
  onNext,
  onFinish,
  isLast,
  setAnswer
}) => {
  const [items, setItems] = useState(question.items);
  const [matches, setMatches] = useState({});

  useEffect(() => {
    setItems(question.items);
    setMatches({});
  }, [question]);

  const handleDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || destination.droppableId === "choices") return;
    setMatches((prev) => ({ ...prev, [draggableId]: destination.droppableId }));
    setItems((prev) => prev.filter((item) => item !== draggableId));
    setAnswer(question.id, { ...matches, [draggableId]: destination.droppableId });
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "black",
        borderRadius: 3,
        boxShadow: 4,
        padding: 4,
        mb: 4
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        Question {current + 1} / {total}
      </Typography>

      <Typography variant="h6" whiteSpace="pre-line" gutterBottom>
        {question.question}
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Choix</Typography>
            <Droppable droppableId="choices">
              {(provided) => (
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  spacing={1}
                  sx={{ minHeight: 150 }}
                >
                  {items.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided) => (
                        <Paper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ p: 1 }}
                        >
                          {item}
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle1">Cibles</Typography>
            <Stack spacing={2}>
              {question.targets.map((target) => (
                <Droppable key={target} droppableId={target}>
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ p: 2, minHeight: 60 }}
                    >
                      <Typography variant="body2">{target}</Typography>
                      {Object.entries(matches)
                        .filter(([, dest]) => dest === target)
                        .map(([item]) => (
                          <Box key={item}>{item}</Box>
                        ))}
                      {provided.placeholder}
                    </Paper>
                  )}
                </Droppable>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </DragDropContext>

      {submitted && (
        <Typography
          variant="body1"
          color={isCorrect ? "green" : "red"}
          mt={2}
        >
          {isCorrect ? "✔ Bonne réponse !" : "✘ Mauvaise réponse."}
        </Typography>
      )}

      {showExplanation && submitted && (
        <Typography
          variant="body2"
          color="info.main"
          mt={1}
          whiteSpace="pre-line"
        >
          💬 {question.explanation}
        </Typography>
      )}

      <Stack direction="row" spacing={1} mt={3}>
        <Button onClick={onPrev} disabled={current === 0}>
          ◀ Précédent
        </Button>
        {!submitted && (
          <Button
            variant="contained"
            onClick={onSubmitAnswer}
          >
            ✅ Soumettre
          </Button>
        )}
        <Button
          onClick={onShowExplanation}
          disabled={!submitted}
          color="secondary"
        >
          💡 Explication
        </Button>
        {isLast && submitted && (
          <Button onClick={onFinish}>
            🏁 Terminer
          </Button>
        )}
        {!isLast && (
          <Button onClick={onNext} disabled={!submitted}>
            ▶ Suivant
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default DragDropPage;
