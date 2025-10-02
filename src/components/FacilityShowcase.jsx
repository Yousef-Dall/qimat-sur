import React from "react";
import { Box, Typography, Container, Card } from "@mui/material";
import { useI18n } from "../i18n/I18nProvider";
import facilityImg from "../assets/qsmt-facility.jpg";

import { motion } from "framer-motion";
const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

export default function FacilityShowcase({ src = facilityImg }) {
  const { t } = useI18n();

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <Box component="section" aria-labelledby="facility-title" sx={{ py: 6 }}>
      <Container maxWidth="lg" disableGutters>
        <MotionBox
          initial={{ opacity: 0, scaleX: 0.2 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          sx={{
            mx: "auto",
            mb: 6,
            height: 2,
            width: "60%",
            background: "rgba(255,255,255,.3)",
            transformOrigin: "center",
            borderRadius: 1,
          }}
        />

        <MotionTypography
          id="facility-title"
          component="h2"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          sx={{
            fontWeight: 700,
            fontSize: "clamp(1.8rem,4vw,2.5rem)",
            textAlign: "center",
            mb: 6,
            color: "#fff",
            textShadow: "0 2px 8px rgba(0,0,0,.3)",
          }}
        >
          {t("facility.title", "Our Facility")}
        </MotionTypography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MotionCard
            component="figure"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8 }}
            sx={{
              m: 0,
              mx: "auto",
              width: { xs: "96%", sm: "90%", md: "80%" },
              maxWidth: 1200,
              borderRadius: "20px",
              overflow: "hidden",
              background: "rgba(255,255,255,.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,.3)",
            }}
          >
            <MotionBox
              component="img"
              src={src}
              alt={t("facility.alt", "QSMT workshop frontage with signage")}
              loading="lazy"
              initial={{ scale: 1.02 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{ display: "block", width: "100%", height: "auto", objectFit: "cover" }}
            />
          </MotionCard>
        </Box>
      </Container>
    </Box>
  );
}
