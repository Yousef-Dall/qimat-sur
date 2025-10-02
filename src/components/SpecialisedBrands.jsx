import React from "react";
import { Box, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

import volvo     from "../assets/volvo.png";
import scania    from "../assets/scania.png";
import fuso      from "../assets/fuso.png";
import isuzu     from "../assets/isuzu.png";
import mercedes  from "../assets/mercedes.png";
import man       from "../assets/man.png";
import hyundai   from "../assets/hyundai.png";
import JAC       from "../assets/JAC.png";
import Daihatsu  from "../assets/daihatsu.png";

const MBox = motion(Box);
const MTypo = motion(Typography);

export default function SpecialisedBrands() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  const prefersReduced = useReducedMotion();

  const title = t("specialised.heading", isAr ? "نحن متخصصون في" : "We Are Specialised In");

  const localizedItems = t("specialised.items") || [];
  const altFor = (id, fallback) => {
    const hit = Array.isArray(localizedItems) ? localizedItems.find((x) => x.id === id) : null;
    return (hit && hit.alt) || fallback;
  };

  const BRANDS = [
    { id: "volvo",     img: volvo,     alt: "Volvo" },
    { id: "scania",    img: scania,    alt: "Scania" },
    { id: "fuso",      img: fuso,      alt: "FUSO Canter" },
    { id: "isuzu",     img: isuzu,     alt: "ISUZU" },
    { id: "mercedes",  img: mercedes,  alt: "Mercedes-Benz" },
    { id: "man",       img: man,       alt: "MAN" },
    { id: "daihatsu",  img: Daihatsu,  alt: "Daihatsu" },
    { id: "hyundai",   img: hyundai,   alt: "Hyundai" },
    { id: "jac",       img: JAC,       alt: "JAC" },
  ];

  const viewport = { once: false, amount: 0.2 };

  const containerStagger = {
    initial: { opacity: 1 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.08 },
    },
    viewport,
  };

  const cardVariant = {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    viewport,
  };

  const imgHover = prefersReduced ? {} : { scale: 1.03, transition: { duration: 0.18 } };

  return (
    <Box
      component="section"
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        background: "transparent",
        color: "#fff",
        py: "8px",
        px: "16px",
        pt: "28px",
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      <MTypo
        component="h2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
        viewport={viewport}
        sx={{
          m: "0 0 18px",
          fontWeight: 800,
          fontSize: "clamp(20px, 2.2vw, 28px)",
          textAlign: "center",
          letterSpacing: "0.2px",
        }}
      >
        {title}
      </MTypo>

      <MBox
        variants={containerStagger}
        initial="initial"
        whileInView="whileInView"
        viewport={viewport}
        sx={{
          listStyle: "none",
          p: 0,
          m: "0 auto",
          display: "grid",
          maxWidth: "900px",
          gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
          gap: { xs: "16px 18px", sm: "20px 22px", md: "24px 28px" },
          alignItems: "center",
          justifyContent: "center",
          "@media (max-width: 900px)": {
            gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
          },
          "@media (max-width: 520px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        {BRANDS.map((b) => (
          <MBox
            key={b.id}
            variants={cardVariant}
            whileHover={
              prefersReduced
                ? {}
                : { y: -2, boxShadow: "0 12px 24px rgba(0,0,0,0.28)" }
            }
            sx={{
              display: "grid",
              placeItems: "center",
              p: "10px 8px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              width: "100%",
              height: 160,
              mx: "auto",
              transition: "all 0.25s ease",
              "&:hover": {
                background: "rgba(255,255,255,0.10)",
                borderColor: "rgba(255,255,255,0.20)",
              },
              "@media (max-width: 900px)": { height: 170 },
              "@media (max-width: 520px)": { height: 180 },
            }}
          >
            <motion.img
              src={b.img}
              alt={altFor(b.id, b.alt)}
              loading="lazy"
              whileHover={imgHover}
              style={{
                maxWidth: "70%",
                maxHeight: "70%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))",
                display: "block",
              }}
            />
          </MBox>
        ))}
      </MBox>
    </Box>
  );
}
