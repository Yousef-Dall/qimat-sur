import React from "react";
import { Box, Container, Typography, Card } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

import imgTeam from "../assets/team.jpg";
import imgOffroad from "../assets/emergency.png";
import imgTools from "../assets/tools.jpg";

import icoService from "../assets/service.png";
import icoMarket from "../assets/market.png";
import icoAdapt from "../assets/adapt.png";

const CAPACITY_IMG = { team: imgTeam, offroad: imgOffroad, tools: imgTools };
const APPROACH_ICON = { service: icoService, market: icoMarket, adapt: icoAdapt };
const asArray = (x, fallback = []) => (Array.isArray(x) ? x : fallback);

const MBox = motion(Box);
const MCard = motion(Card);
const MTy = motion(Typography);

export default function TechCapacityApproach() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  const reduce = useReducedMotion();

  const cap = asArray(t("tca.capacity", []));
  const app = asArray(t("tca.approach", []));
  const hCap = t("tca.heading_capacity", isAr ? "القدرات الفنية في QSMT" : "QSMT Technical Capacity");
  const hApp = t("tca.heading_approach", isAr ? "نهج QSMT" : "QSMT Approach");

  const viewport = { once: false, amount: 0.25 };

  const ruleVariant = {
    initial: { scaleX: 0, opacity: 0.7, transformOrigin: "center" },
    whileInView: { scaleX: 1, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const headingVariant = {
    initial: { opacity: 0, y: reduce ? 0 : 8 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const gridStagger = {
    initial: { opacity: 1 },
    whileInView: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };

  const itemVariant = {
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const cardVariant = {
    initial: { opacity: 0, y: reduce ? 0 : 12, scale: 1 },
    whileInView: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <Box component="section" id="tca" dir={isAr ? "rtl" : "ltr"} sx={{ color: "#fff", py: 3 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1100, mx: "auto", px: 2 }}>
        <MBox
          variants={ruleVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={viewport}
          sx={{ height: 3, background: "rgb(255,255,255)", my: "8px", borderRadius: 1 }}
        />
        {!!hCap && (
          <MTy
            component="h2"
            variants={headingVariant}
            initial="initial"
            whileInView="whileInView"
            viewport={viewport}
            sx={{
              fontSize: "28px",
              fontWeight: 800,
              textAlign: "center",
              letterSpacing: "0.3px",
              mt: 0,
              mb: "18px",
              textShadow: "0 1px 0 rgba(0,0,0,.2)",
            }}
          >
            {hCap}
          </MTy>
        )}

        <MBox
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={viewport}
          sx={{
            listStyle: "none",
            p: 0,
            m: "0 0 20px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "22px",
            "@media (max-width:980px)": { gridTemplateColumns: "1fr" },
          }}
        >
          {cap.map((c) => (
            <MBox
              key={c.id}
              variants={itemVariant}
              whileHover={reduce ? {} : { y: -4, transition: { duration: 0.18 } }}
              sx={{ display: "grid", gap: "10px", justifyItems: "center" }}
            >
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(255,255,255,.12)",
                  transition: "all .3s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,.10)",
                    boxShadow: "0 14px 28px rgba(0,0,0,.32)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {CAPACITY_IMG[c.id] ? (
                  <Box
                    component="img"
                    src={CAPACITY_IMG[c.id]}
                    alt={c.alt || ""}
                    loading="lazy"
                    sx={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                  />
                ) : (
                  <Box sx={{ width: "100%", height: "100%", background: "rgba(255,255,255,.2)" }} />
                )}
              </Box>

              <Typography sx={{ fontSize: 16, lineHeight: 1.35, textAlign: "center" }}>
                {c.caption}
              </Typography>
            </MBox>
          ))}
        </MBox>

        <MBox
          variants={ruleVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={viewport}
          sx={{ height: 3, background: "rgb(255,255,255)", my: "8px", borderRadius: 1 }}
        />
        {!!hApp && (
          <MTy
            component="h2"
            variants={headingVariant}
            initial="initial"
            whileInView="whileInView"
            viewport={viewport}
            sx={{
              fontSize: "28px",
              fontWeight: 800,
              textAlign: "center",
              letterSpacing: "0.3px",
              mt: 0,
              mb: "18px",
              textShadow: "0 1px 0 rgba(0,0,0,.2)",
            }}
          >
            {hApp}
          </MTy>
        )}

        <MBox
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={viewport}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "26px",
            mt: "18px",
            "@media (max-width:980px)": { gridTemplateColumns: "1fr" },
          }}
        >
          {app.map((a) => (
            <MCard
              key={a.id}
              variants={cardVariant}
              whileHover={reduce ? {} : { y: -4, boxShadow: "0 14px 28px rgba(0,0,0,.32)" }}
              transition={{ duration: 0.2 }}
              sx={{
                background: "rgba(0,0,0,.60)",
                borderRadius: "16px",
                p: "18px 16px",
                boxShadow: "0 10px 22px rgba(0,0,0,.25)",
                border: "1px solid rgba(255,255,255,.12)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                minHeight: 220,
                justifyContent: "center",
                textAlign: "center",
                transition: "all .3s ease",
                "&:hover": {
                  background: "rgba(255,255,255,.12)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <MBox
                initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
                whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } }}
                viewport={viewport}
                sx={{
                  width: 100,
                  height: 100,
                  mb: "10px",
                  borderRadius: "50%",
                  background: "#fff",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 12px 24px rgba(0,0,0,.28)",
                  overflow: "hidden",
                }}
              >
                {APPROACH_ICON[a.id] ? (
                  <Box component="img" src={APPROACH_ICON[a.id]} alt="" sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : (
                  <Box sx={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0,0,0,.1)" }} />
                )}
              </MBox>

              <MTy
                variants={itemVariant}
                sx={{ fontSize: 18, fontWeight: 800, m: "6px 0", textAlign: "center" }}
              >
                {a.title}
              </MTy>
              <MTy
                variants={itemVariant}
                sx={{ fontSize: 14.5, lineHeight: 1.5, textAlign: "center", color: "#e9eef7" }}
              >
                {a.text}
              </MTy>
            </MCard>
          ))}
        </MBox>
      </Container>
    </Box>
  );
}
