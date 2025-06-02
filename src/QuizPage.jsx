import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Typography,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
  useMediaQuery,
  useTheme,
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
  isLast,
}) => {
  const [selected, setSelected] = useState(selectedAnswers || []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        mb: 4,
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        Question {current + 1} / {total}
      </Typography>

      <Grid
        container
        spacing={2}
        alignItems="flex-start"
        direction={isMobile ? "column" : "row"}
      >
        {/* IMAGE */}
        {question.image && (
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",           // Rend le Grid item un conteneur flex
              justifyContent: "center",  // ✅ Centre son contenu horizontalement
              alignItems: "center",      // Centre verticalement (utile si le contenu est plus petit)
            }}
          >
            <Box
              sx={{
                // Ces styles ne sont plus nécessaires pour le centrage horizontal,
                // mais ils sont inoffensifs et peuvent aider au centrage vertical
                // si la Box interne était un conteneur flex pour d'autres éléments.
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={question.image}
                alt="Illustration"
                sx={{
                  maxWidth: "100%",
                  maxHeight: 250,
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Box>
          </Grid>
        )}

        {/* CONTENU QUESTION */}
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

          <Stack direction="row" spacing={1} mt={3} flexWrap="wrap">
            <Button onClick={onPrev} disabled={current === 0}>
              ◀ Précédent
            </Button>
            <Button
              variant="contained"
              onClick={onSubmitAnswer}
              disabled={selected.length === 0 || submitted}
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
      </Grid>
    </Box>
  );
};

export default QuizPage;