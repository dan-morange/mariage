import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

import {
  Box,
  Typography,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  Stack
} from "@mui/material";

const QuizPage = ({
  question,
  current,
  total,
  selectedAnswers,
  submitted,
  isCorrect,
  showExplanation,
  onAnswerChange,
  onSubmitAnswer,
  onShowExplanation,
  onPrev,
  onNext,
  onFinish,
  isLast
}) => {
  const [selected, setSelected] = useState(selectedAnswers || []);

  useEffect(() => {
    setSelected(selectedAnswers || []);
  }, [question]);

  const toggleChoice = (choice) => {
    if (submitted) return;
    const newSelected = selected.includes(choice)
      ? selected.filter((c) => c !== choice)
      : [...selected, choice];
    setSelected(newSelected);
    onAnswerChange(question.id, newSelected);
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

    <Grid container spacing={2} alignItems="flex-start">
      {/* Texte de la question */}
      <Grid item xs={12} md={question.image ? 8 : 12}>
        <Typography variant="h6" whiteSpace="pre-line" gutterBottom>
          <ReactMarkdown>{question.question}</ReactMarkdown>
        </Typography>

        <Stack spacing={1}>
          {question.choices.map((choice) => (
            <FormControlLabel
              key={choice}
              control={
                <Checkbox
                  checked={selected.includes(choice)}
                  onChange={() => toggleChoice(choice)}
                  disabled={submitted}
                />
              }
              label={choice}
            />
          ))}
        </Stack>

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
            💬 <ReactMarkdown>{question.explanation}</ReactMarkdown>
          </Typography>
        )}

        <Stack direction="row" spacing={1} mt={3}>
          <Button onClick={onPrev} disabled={current === 0}>
            ◀ Précédent
          </Button>
          <Button
            variant="contained"
            onClick={onSubmitAnswer}
            disabled={submitted}
          >
            ✅ Soumettre
          </Button>
          <Button
            onClick={onShowExplanation}
            disabled={!submitted}
            color="secondary"
          >
            💡 Explication
          </Button>
          {isLast ? (
            <Button onClick={onFinish} disabled={!submitted}>
              🏁 Terminer
            </Button>
          ) : (
            <Button onClick={onNext} disabled={!submitted}>
              ▶ Suivant
            </Button>
          )}
        </Stack>
      </Grid>

      {/* Image associée à la question */}
      {question.image && (
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={`/images/${question.image}`}
            alt="Illustration"
            sx={{
              width: "100%",
              maxHeight: 250,
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
              mt: { xs: 2, md: 0 }
            }}
          />
        </Grid>
      )}
    </Grid>
  </Box>
);
};

export default QuizPage;
