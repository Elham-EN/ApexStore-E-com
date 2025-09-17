import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Slide, useTheme } from "@mui/material";
import React, { useState } from "react";

interface SlideImage {
  imageUrl: string;
  name: string;
}

type SlideDirection = "left" | "right" | "up" | "down" | undefined;

export default function Carousel(): React.ReactElement {
  const slides: SlideImage[] = [
    { imageUrl: "/images/carousels/anime-merch-1.png", name: "anime-merch-1" },
    { imageUrl: "/images/carousels/anime-merch-2.png", name: "anime-merch-2" },
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");
  const theme = useTheme();

  // Navigation handlers
  const handleNext = () => {
    setSlideDirection("left");
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevious = () => {
    setSlideDirection("right");
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: 400, // Fixed height crucial for transitions
        width: "100%",
        borderRadius: 2,
        backgroundColor: "grey.100",
      }}
    >
      {slides.map((slide, index) => (
        <Slide
          key={index}
          direction={slideDirection}
          in={currentIndex === index}
          timeout={theme.transitions.duration.standard}
          mountOnEnter
          unmountOnExit
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={slide.imageUrl}
              alt={slide.name}
              style={{
                maxWidth: "100%",

                objectFit: "contain",
              }}
            />
          </Box>
        </Slide>
      ))}
      {/* Previous Button */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(32, 31, 31, 0.8)",
          "&:hover": { backgroundColor: "rgba(108, 108, 108, 0.9)" },
          zIndex: 1,
        }}
      >
        <ChevronLeft />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(32, 31, 31, 0.8)",
          "&:hover": { backgroundColor: "rgba(108, 108, 108, 0.9)" },
          zIndex: 1,
        }}
      >
        <ChevronRight />
      </IconButton>
      {/* Dots Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor:
                currentIndex === index ? "primary.main" : "grey.400",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
