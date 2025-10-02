import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  Divider,
  Link,
} from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import mapImg from "../assets/qsmt-map.png";

const MBox = motion(Box);
const MTypo = motion(Typography);
const MCard = motion(Card);
const MDivider = motion(Divider);
const MLink = motion(Link);

export default function LocationSection() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  const prefersReduced = useReducedMotion();

  const title = t("location.heading", isAr ? "الموقع" : "Location");
  const address = t(
    "location.address_full",
    isAr
      ? "المنطقة الصناعية بولاية بركاء، محافظة جنوب الباطنة، مسقط، عُمان"
      : "Barka Industrial Area, Barka Province, Al Batinah South Governorate, Muscat, Oman"
  );
  const openMaps = t(
    "location.open_maps",
    isAr ? "افتح في خرائط جوجل" : "Open in Google Maps"
  );

  const mapsUrl = "https://maps.app.goo.gl/QpwBGe4HPZCzp3FY6";

  const viewport = { once: false, amount: 0.35 };

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: 0.45, ease: "easeOut", delay } },
    viewport,
  });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay } },
    viewport,
  });

  const containerStagger = {
    initial: { opacity: 1 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
    viewport,
  };

  return (
    <Box
      component="section"
      dir={isAr ? "rtl" : "ltr"}
      sx={{ py: { xs: 4, sm: 6 }, direction: isAr ? "rtl" : "ltr" }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <MBox variants={containerStagger} initial="initial" whileInView="whileInView" viewport={viewport}>
          <MDivider
            variants={fadeIn(0)}
            sx={{
              mx: "auto",
              mb: { xs: 3, sm: 4 },
              background: "rgba(255,255,255,0.3)",
              height: 2,
              width: { xs: "70%", sm: "60%" },
            }}
          />

          <MTypo
            id="location"
            component="h2"
            variants={fadeUp(0.05)}
            sx={{
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3.6vw, 2.2rem)",
              textAlign: "center",
              mb: { xs: 2.5, sm: 3.5 },
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,.3)",
            }}
          >
            {title}
          </MTypo>

          <MLink
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={openMaps}
            variants={fadeUp(0.1)}
            whileHover={
              prefersReduced ? {} : { scale: 1.02, y: -2, transition: { duration: 0.18 } }
            }
            whileTap={prefersReduced ? {} : { scale: 0.99 }}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.2,
              px: { xs: 1.5, sm: 2 },
              py: { xs: 1, sm: 1.25 },
              borderRadius: 2,
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.20)",
              color: "#fff",
              textDecoration: "none",
              fontSize: { xs: ".95rem", sm: "1.05rem" },
              mx: "auto",
              mb: { xs: 2.5, sm: 3.5 },
              textAlign: "center",
              whiteSpace: "normal",
              wordBreak: "break-word",
              maxWidth: "100%",
              displayPrint: "none",
              "&:hover": {
                background: "rgba(255,255,255,0.14)",
                boxShadow: "0 8px 24px rgba(0,0,0,.30)",
              },
            }}
          >
            <LocationIcon fontSize="medium" />
            <Typography component="span">{address}</Typography>
          </MLink>

          <MCard
            component="figure"
            variants={fadeUp(0.15)}
            whileHover={
              prefersReduced ? {} : { y: -6, boxShadow: "0 30px 80px rgba(0,0,0,.40)" }
            }
            transition={{ type: "tween", duration: 0.25 }}
            sx={{
              m: 0,
              mx: "auto",
              borderRadius: { xs: 2, sm: 3 },
              overflow: "hidden",
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.20)",
              boxShadow: "0 20px 60px rgba(0,0,0,.30)",
              maxWidth: { xs: "100%", md: 1100 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: { xs: "16/9", md: "21/9" },
              }}
            >
              <MBox
                component="img"
                src={mapImg}
                alt={t(
                  "location.map_alt",
                  "Map showing QSMT location in Barka Industrial Area"
                )}
                loading="lazy"
                initial={{ scale: 1.02 }}
                whileInView={{
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                }}
                viewport={viewport}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </MCard>

          <MTypo
            variant="caption"
            variants={fadeIn(0.2)}
            sx={{
              display: "block",
              textAlign: "center",
              mt: 1.5,
              opacity: 0.8,
              color: "#fff",
            }}
          >
            {t(
              "location.directions",
              isAr ? "اضغط على الخريطة لفتح الموقع في خرائط جوجل" : "Tap the map to open in Google Maps"
            )}
          </MTypo>
        </MBox>
      </Container>
    </Box>
  );
}
