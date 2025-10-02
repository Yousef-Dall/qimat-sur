import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  IconButton,
  MobileStepper,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useI18n } from "../i18n/I18nProvider";

import { motion, AnimatePresence } from "framer-motion";
const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionImg = motion("img");
const MotionTypography = motion(Typography);

export default function Carousel({
  images = [],
  intervalMs = 2500,
  aspect = "16/9",
  titleEn = "Gallery",
  titleAr = "المعرض",
  titleAlign = "center",
}) {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const pausedRef = useRef(false);
  const count = images.length;

  const goTo = (i) => {
    if (!count) return;
    setIndex(((i % count) + count) % count);
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  useEffect(() => {
    if (count <= 1 || pausedRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [count, intervalMs, index]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    clearInterval(timerRef.current);
  };
  const handleMouseLeave = () => {
    pausedRef.current = false;
    if (count > 1) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % count);
      }, intervalMs);
    }
  };

  if (!count) return null;

  const cur = images[index] || {};
  const alt =
    (isAr ? cur.alt_ar : cur.alt_en) || cur.alt || `Slide ${index + 1}`;
  const caption =
    (isAr ? cur.caption_ar : cur.caption_en) || cur.caption || "";

  return (
    <Box
      component="section"
      id="gallery"
      dir={isAr ? "rtl" : "ltr"}
      sx={{ py: { xs: 4, md: 5 } }}
    >
      <Container maxWidth="lg">
        <MotionTypography
          component="h2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          sx={{
            textAlign: titleAlign,
            fontWeight: 800,
            fontSize: "clamp(20px, 2vw, 28px)",
            letterSpacing: "0.3px",
            mb: 3,
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {isAr ? titleAr : titleEn}
        </MotionTypography>

        <Box
          aria-roledescription="carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
          }}
          tabIndex={0}
          sx={{ outline: "none" }}
        >
          <MotionCard
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              width: { xs: "100%", md: "60vw" },
              maxWidth: "1200px",
              mx: "auto",
              height: { xs: 280, sm: 360, md: "70vh", lg: "80vh" },
              willChange: "transform, opacity",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <MotionImg
                key={cur.src || index}
                src={cur.src}
                alt={alt}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.005 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  willChange: "transform, opacity",
                }}
              />
            </AnimatePresence>

            {caption && (
              <MotionBox
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                sx={{
                  position: "absolute",
                  left: isAr ? "auto" : 16,
                  right: isAr ? 16 : "auto",
                  bottom: 12,
                  background: "rgba(0,0,0,0.45)",
                  color: "#fff",
                  px: 1.5,
                  py: 1,
                  borderRadius: 1.5,
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: isAr ? "right" : "left",
                  maxWidth: { xs: "90%", sm: "70%" },
                  willChange: "transform, opacity",
                }}
              >
                {caption}
              </MotionBox>
            )}

            {count > 1 && (
              <>
                <IconButton
                  aria-label={isAr ? "السابق" : "Previous"}
                  onClick={prev}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 12,
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                  }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                  aria-label={isAr ? "التالي" : "Next"}
                  onClick={next}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 12,
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                  }}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </>
            )}
          </MotionCard>

          {count > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1.5 }}>
              <MobileStepper
                variant="dots"
                steps={count}
                position="static"
                activeStep={index}
                nextButton={<div />}
                backButton={<div />}
                sx={{
                  background: "transparent",
                  "& .MuiMobileStepper-dot": {
                    width: 10,
                    height: 10,
                    opacity: 0.45,
                    backgroundColor: "#a8b1ff",
                  },
                  "& .MuiMobileStepper-dotActive": {
                    opacity: 1,
                    width: 22,
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
