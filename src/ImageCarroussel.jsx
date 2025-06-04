// src/ImageCarousel.jsx
import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const ImageCarroussel = ({ images, interval = 5000 }) => {
  const [index, setIndex] = useState(0);

  // Défilement automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "600px",
        height: "400px",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        component="img"
        src={images[index]}
        alt={`slide-${index}`}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s ease-in-out",
        }}
      />
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.4)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.4)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default ImageCarroussel;
