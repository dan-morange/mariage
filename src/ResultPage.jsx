import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Container,
  FormControlLabel,
  Switch,
} from "@mui/material";

const ResultPage = ({ questions, answers, onRestart }) => {
  const [showRecap, setShowRecap] = useState(false);

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
        height: "100vh",
        backgroundImage: `url('${import.meta.env.BASE_URL}mariage1.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Box sx={{ pt: "10vh" }}>
       <Container maxWidth="sm">
        <Paper elevation={6} sx={{ mt: 4,p: 4, bgcolor: "white" }}>
          <Typography variant="h4" gutterBottom align="center">
            Résultats du Quiz
          </Typography>

          <Typography variant="h6" gutterBottom align="center">
            Score : {correctCount} / {total}
          </Typography>

          <Typography variant="body2" sx={{ padding: 1 }}>
            Félicitations ! Vous avez terminé le quiz avec un très bon score. Vous êtes prêts pour le Mariage !
          </Typography>

          <Typography variant="body2" sx={{ padding: 1, color: "red" }}>
            <strong>Juliette</strong>, je tenais en particulier à te remercier pour ton aide précieuse et le temps passé pour la création d'ANEDIA. Aussi je t'invite à ouvrir le <strong>cadeau</strong> ci-dessous,  que tu pourras utiliser avant fin août.
          </Typography>

          <Button
            variant="contained"
            sx={{
              padding: 0,
              minWidth: "auto",
              borderRadius: 2,
            }}
            onClick={() => {
              window.open("https://tinyurl.com/mariageJFCadeauJuliette", "_blank");
            }}
          >
            <Box
              component="img"
              src="cadeau.png"
              alt="Bouton cadeau"
              sx={{
                width: 100,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Button>

          {/* Switch pour afficher/cacher le récapitulatif */}
          <Box mt={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={showRecap}
                  onChange={() => setShowRecap(!showRecap)}
                />
              }
              label="Afficher le récapitulatif des réponses"
            />
          </Box>

          {showRecap && (
            <>
              <Typography variant="h6" sx={{ padding: 1 }}>
                Récapitulatif des réponses
              </Typography>
              <Stack spacing={2} mt={2}>
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
            </>
          )}

          <Box textAlign="center" mt={4}>
            <Button variant="contained" onClick={onRestart}>
              🔁 Recommencer
            </Button>
          </Box>
        </Paper>
      </Container>
       </Box>
    </Box>
  );
};

export default ResultPage;
