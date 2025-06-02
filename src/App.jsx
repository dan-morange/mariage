import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import QuizPage from "./QuizPage";
import DragDropPage from "./DragDropPage";
import ResultPage from "./ResultPage";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [isCorrectMap, setIsCorrectMap] = useState({});
  const [showExplanation, setShowExplanation] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}Questions.json`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Erreur chargement JSON :", err));
  }, []);

  useEffect(() => {
    document.title = "Tests de culture prénuptial de Juju et Baf";
  }, []);

  const handleAnswerChange = (questionId, selectedChoices) => {
    setAnswers({ ...answers, [questionId]: selectedChoices });
  };

  const handleSubmitAnswer = () => {
    const question = questions[current];
    let isCorrect = false;

    if (question.type === "multiple") {
      const correct = question.correctAnswers.sort().join();
      const user = (answers[question.id] || []).sort().join();
      isCorrect = correct === user;
    } else if (question.type === "dragdrop") {
      const expected = question.correctMatches;
      const userMatch = answers[question.id] || {};
      isCorrect = Object.entries(expected).every(
        ([item, target]) => userMatch[item] === target
      );
    }

    setSubmittedQuestions((prev) => ({ ...prev, [question.id]: true }));
    setIsCorrectMap((prev) => ({ ...prev, [question.id]: isCorrect }));
    setShowExplanation((prev) => ({ ...prev, [question.id]: false }));

    if (current === questions.length - 1) {
      setTimeout(() => setQuizFinished(true), 100);
    }
  };

  const handleShowExplanation = () => {
    const qid = questions[current].id;
    setShowExplanation((prev) => ({ ...prev, [qid]: true }));
  };

  const handleNext = () => setCurrent((i) => Math.min(i + 1, questions.length - 1));
  const handlePrev = () => setCurrent((i) => Math.max(i - 1, 0));
  const handleFinish = () => setQuizFinished(true);

  const handleRestart = () => {
    setAnswers({});
    setCurrent(0);
    setSubmittedQuestions({});
    setIsCorrectMap({});
    setShowExplanation({});
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <ResultPage
        questions={questions}
        answers={answers}
        onRestart={handleRestart}
      />
    );
  }

  if (questions.length === 0) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url('${import.meta.env.BASE_URL}mariage1.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1.5rem"
        }}
      >
        Chargement du quiz...
      </Box>
    );
  }

  const question = questions[current];
  const qid = question.id;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url('${import.meta.env.BASE_URL}mariage1.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh",
          paddingTop: "5vh"
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", md: "70%" },
            position: "relative",
            zIndex: 1
          }}
        >
          {/* Titre fixe au-dessus du contenu scrollable */}
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="white"
            sx={{ mb: 1, textShadow: "0 0 6px black" }}
          >
            Tests de culture prénuptial de Juju et Baf
          </Typography>

          {/* Contenu scrollable */}
          <Box
            sx={{
              maxHeight: "85vh",
              overflowY: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: 2,
              padding: 2,
              boxShadow: 6
            }}
          >
            {question.type === "multiple" ? (
              <QuizPage
                question={question}
                total={questions.length}
                current={current}
                selectedAnswers={answers[qid] || []}
                submitted={submittedQuestions[qid] || false}
                isCorrect={isCorrectMap[qid] || false}
                showExplanation={showExplanation[qid] || false}
                onAnswerChange={handleAnswerChange}
                onSubmitAnswer={handleSubmitAnswer}
                onShowExplanation={handleShowExplanation}
                onPrev={handlePrev}
                onNext={handleNext}
                onFinish={handleFinish}
                isLast={current === questions.length - 1}
              />
            ) : question.type === "dragdrop" ? (
              <DragDropPage
                question={question}
                total={questions.length}
                current={current}
                submitted={submittedQuestions[qid] || false}
                isCorrect={isCorrectMap[qid] || false}
                showExplanation={showExplanation[qid] || false}
                onSubmitAnswer={handleSubmitAnswer}
                onShowExplanation={handleShowExplanation}
                onPrev={handlePrev}
                onNext={handleNext}
                onFinish={handleFinish}
                isLast={current === questions.length - 1}
                setAnswer={(qid, val) =>
                  setAnswers((prev) => ({ ...prev, [qid]: val }))
                }
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
