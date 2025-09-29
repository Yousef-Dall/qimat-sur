import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  IconButton,
  MobileStepper,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useI18n } from "../i18n/I18nProvider";



export default function Carousel({ 
  images = [], 
  intervalMs = 3000, 
  titleEn = "Gallery", 
  titleAr = "المعرض",
  titleAlign = "center" 
}) {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  useEffect(() => {
    if (maxSteps <= 1) return;
    
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % maxSteps);
    }, intervalMs);
    
    return () => clearInterval(timer);
  }, [maxSteps, intervalMs]);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);
  };

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[activeStep];

  return (
    <Box 
      component="section" 
      id="gallery" 
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        padding: '60px 0',
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          component="h2" 
          sx={{ 
            textAlign: titleAlign,
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            marginBottom: '48px',
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          {isAr ? titleAr : titleEn}
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <Card sx={{
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}>
            <Box
              component="img"
              src={currentImage.src}
              alt={currentImage.alt || currentImage.alt_en || `Gallery image ${activeStep + 1}`}
              loading="lazy"
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Card>

          {maxSteps > 1 && (
            <>
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: 16,
                transform: 'translateY(-50%)',
              }}>
                <IconButton
                  onClick={handleBack}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </Box>

              <Box sx={{
                position: 'absolute',
                top: '50%',
                right: 16,
                transform: 'translateY(-50%)',
              }}>
                <IconButton
                  onClick={handleNext}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 3 
              }}>
                <MobileStepper
                  variant="dots"
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  sx={{
                    backgroundColor: 'transparent',
                    '& .MuiMobileStepper-dot': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '& .MuiMobileStepper-dotActive': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                  nextButton={<div />}
                  backButton={<div />}
                />
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}