// src/IntroPage.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ImageCarroussel from "./ImageCarroussel"; // ✅ import du composant IntroPage

const IntroPage = ({ onStart }) => {

  const images = [
    `${import.meta.env.BASE_URL}jf1.png`,
    `${import.meta.env.BASE_URL}jf2.png`,
    `${import.meta.env.BASE_URL}jf3.png`,
    `${import.meta.env.BASE_URL}jf4.png`,
    `${import.meta.env.BASE_URL}jf5.png`,
    `${import.meta.env.BASE_URL}jf6.png`,
    `${import.meta.env.BASE_URL}jf7.png`,
    `${import.meta.env.BASE_URL}jf8.png`,
  ];
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url('${import.meta.env.BASE_URL}mariage2.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{ textShadow: "0 0 8px black", mb: 3 }}
      >
        Bienvenue dans l'univers ANEDIA avec un quiz spécial mariage ! 🎉
      </Typography>
      <Typography
        variant="h6"
        sx={{ textShadow: "0 0 6px black", mb: 4 }}
      >
        Ce site a été construit avec l'aide de plusieurs IA génératives.
        Amusez-vous bien   💕
      </Typography>
      <ImageCarroussel images={images} interval={2000} />
      <Typography
        variant="body2"
        sx={{ textShadow: "0 0 6px black", mb: 4,mt: 2 }}
      >
        Les questions du Quiz n'ont généralement qu'une seule bonne réponse, mais certaines peuvent en avoir plusieurs et cela sera précisé dans la question. Les questions de classement utilisent le drag and drop. 
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={onStart}
      >
        Commencer le quiz
      </Button>
    </Box>
  );
};

export default IntroPage;
