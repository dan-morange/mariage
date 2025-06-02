// ResultPage.jsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Container
} from "@mui/material";

const ResultPage = ({ questions, answers, onRestart }) => {
  const total = questions.length;
  const correctCount = questions.reduce((acc, q) => {
    if (q.type === "multiple") {
      const correct = q.correctAnswers.sort().join();
      const user = (answers[q.id] || []).sort().join();
      return acc + (correct === user ? 1 : 0);
    } else if (q.type === "dragdrop") {
      const expected = q.correctMatches;
      const userMatch = answers[q.id] || {};
      const isCorrect = Object.entries(expected).every(
        ([item, target]) => userMatch[item] === target
      );
      return acc + (isCorrect ? 1 : 0);
    }
    return acc;
  }, 0);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: "url('/mariage1.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: "15vh",
        color: "black"
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, bgcolor: "white" }}>
          <Typography variant="h4" gutterBottom align="center">
            Résultats du Quiz
          </Typography>

          <Typography variant="h6" gutterBottom align="center">
            Score : {correctCount} / {total}
          </Typography>

          <Stack spacing={2} mt={4}>
            {questions.map((q, index) => {
              const userAnswer = answers[q.id];
              let isCorrect = false;
              let expected;

              if (q.type === "multiple") {
                expected = q.correctAnswers.sort().join();
                const given = (userAnswer || []).sort().join();
                isCorrect = expected === given;
              } else if (q.type === "dragdrop") {
                expected = q.correctMatches;
                const given = userAnswer || {};
                isCorrect = Object.entries(expected).every(
                  ([item, target]) => given[item] === target
                );
              }

              return (
                <Paper
                  key={q.id}
                  sx={{ p: 2, bgcolor: isCorrect ? "#e0ffe0" : "#ffe0e0" }}
                >
                  <Typography variant="subtitle1">
                    {index + 1}. {q.question}
                  </Typography>

                  {q.type === "multiple" && (
                    <>
                      <Typography variant="body2">
                        ✅ Réponse(s) correcte(s) : {q.correctAnswers.join(", ")}
                      </Typography>
                      <Typography variant="body2">
                        📝 Ta réponse : {(userAnswer || []).join(", ")}
                      </Typography>
                    </>
                  )}

                  {q.type === "dragdrop" && (
                    <Box mt={1}>
                      <Typography variant="body2">✅ Réponses attendues :</Typography>
                      {Object.entries(q.correctMatches).map(([item, target]) => (
                        <Typography variant="body2" key={item}>
                          {item} → {target}
                        </Typography>
                      ))}

                      <Typography variant="body2" mt={1}>
                        📝 Tes réponses :
                      </Typography>
                      {Object.entries(userAnswer || {}).map(([item, target]) => (
                        <Typography variant="body2" key={item}>
                          {item} → {target}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {q.explanation && (
                    <Typography
                      variant="body2"
                      mt={1}
                      sx={{ color: "#666" }}
                      whiteSpace="pre-line"
                    >
                      💡 {q.explanation}
                    </Typography>
                  )}
                </Paper>
              );
            })}
          </Stack>

          <Box textAlign="center" mt={4}>
            <Button variant="contained" onClick={onRestart}>
              🔁 Recommencer
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResultPage;
