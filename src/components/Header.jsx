import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  AccessTime as ClockIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { useI18n } from "../i18n/I18nProvider";

const MotionAppBar = motion(AppBar);
const MotionButton = motion(Button);
const MotionBox = motion(Box);

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const isAr = lang === "ar";

  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inHotzone, setInHotzone] = useState(false);
  const [headerH, setHeaderH] = useState(0);
  const [spaceH, setSpaceH] = useState(0);

  const headerRef = useRef(null);
  const idleRef = useRef(null);

  const IDLE_MS = 4000;

  useEffect(() => {
    document.body.classList.toggle("rtl", isAr);
    return () => document.body.classList.remove("rtl");
  }, [isAr]);

  useEffect(() => {
    const update = () => {
      const h = headerRef.current?.offsetHeight || 0;
      setHeaderH(h);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    update();
    window.addEventListener("resize", update);
    let ro;
    if (window.ResizeObserver && headerRef.current) {
      ro = new ResizeObserver(update);
      ro.observe(headerRef.current);
    }
    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => setSpaceH(visible ? headerH : 0), [visible, headerH]);

  useEffect(() => {
    clearTimeout(idleRef.current);
    if (visible && !hovered && !inHotzone) {
      idleRef.current = setTimeout(() => setVisible(false), IDLE_MS);
    }
    return () => clearTimeout(idleRef.current);
  }, [visible, hovered, inHotzone]);

  const go = (id) => {
    setVisible(true);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const mapsUrl = "https://maps.app.goo.gl/wmLJ7fKsQ4g4ZjHEA";
  const waNumber = "96893689729";

  return (
    <>
      <Box sx={{ height: `${spaceH}px`, transition: "height 220ms ease" }} aria-hidden="true" />

      <Box
        onMouseEnter={() => {
          setInHotzone(true);
          setVisible(true);
        }}
        onMouseLeave={() => setInHotzone(false)}
        onTouchStart={() => {
          setInHotzone(true);
          setVisible(true);
        }}
        onTouchEnd={() => setInHotzone(false)}
        aria-hidden="true"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: { xs: "120px", sm: "160px" },
          zIndex: 9998,
        }}
      />

      <MotionAppBar
        ref={headerRef}
        component={motion.div}
        dir={isAr ? "rtl" : "ltr"}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backdropFilter: "saturate(1.1) blur(6px)",
          background: "rgba(255, 255, 255, 0.86)",
          boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
          color: "#4b5563",
          pointerEvents: visible ? "auto" : "none",
        }}
        onMouseEnter={() => {
          setHovered(true);
          clearTimeout(idleRef.current);
        }}
        onMouseLeave={() => setHovered(false)}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1.25, sm: 2 } }}>
          <Toolbar sx={{ py: "10px", flexDirection: "column", gap: 2 }}>
            <MotionBox
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: 2,
                flexWrap: { xs: "wrap", md: "nowrap" },
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="QSMT logo"
                sx={{
                  width: { xs: 56, sm: 64 },
                  height: { xs: 56, sm: 64 },
                  borderRadius: "50%",
                  objectFit: "contain",
                  background: "#fff",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "center",
                  "@media (max-width: 900px)": { display: "none" },
                  color: "#000",
                  fontSize: 14,
                }}
              >
                <Box
                  component="a"
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: "220px",
                    color: "inherit",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  <LocationIcon fontSize="small" sx={{ color: "#000" }} />
                  <Typography variant="body2" sx={{ color: "#000" }}>
                    {t("header.address")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: "220px",
                    color: "#000",
                  }}
                >
                  <ClockIcon fontSize="small" sx={{ color: "#000" }} />
                  <Typography variant="body2" sx={{ color: "#000" }}>
                    {t("header.hours")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: "220px",
                    color: "#000",
                    "& a": {
                      color: "#000",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    },
                  }}
                >
                  <PhoneIcon fontSize="small" sx={{ color: "#000" }} />
                  <Typography variant="body2" component="span" sx={{ color: "#000" }}>
                    <a href="tel:+96892405017">+968 92405017</a>
                    <span>&nbsp;·&nbsp;</span>
                    <a href="tel:+96879178056">+968 79178056</a>
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", sm: "column" },
                  alignItems: { xs: "center", sm: "flex-end" },
                  gap: { xs: 1, sm: 1 },
                  width: { xs: "100%", md: "auto" },
                  justifyContent: { xs: "space-between", sm: "flex-end" },
                }}
              >
                <MotionButton
                  component="a"
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                    isAr ? "مرحبًا QSMT، أود حجز خدمة." : "Hello QSMT, I’d like to book a service."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    borderRadius: "10px",
                    background: "#1f1b5a",
                    color: "#fff",
                    fontWeight: 700,
                    px: 2.25,
                    py: 1.1,
                    textTransform: "none",
                    boxShadow: "0 8px 16px rgba(31,27,90,0.35)",
                    "&:hover": {
                      background: "#2a2570",
                      boxShadow: "0 12px 24px rgba(31,27,90,0.45)",
                    },
                  }}
                >
                  {t("header.book")}
                </MotionButton>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    onClick={() => setLang("en")}
                    sx={{
                      color: lang === "en" ? "#1f1b5a" : "#6b7280",
                      fontWeight: lang === "en" ? 700 : 400,
                      textTransform: "none",
                      minWidth: "auto",
                      px: 1,
                      py: 0.5,
                      "&:hover": { background: "rgba(31,27,90,0.08)" },
                    }}
                  >
                    {t("header.lang_en")}
                  </Button>
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>
                    |
                  </Typography>
                  <Button
                    onClick={() => setLang("ar")}
                    dir="rtl"
                    sx={{
                      color: lang === "ar" ? "#1f1b5a" : "#6b7280",
                      fontWeight: lang === "ar" ? 700 : 400,
                      textTransform: "none",
                      minWidth: "auto",
                      px: 1,
                      py: 0.5,
                      "&:hover": { background: "rgba(31,27,90,0.08)" },
                    }}
                  >
                    {t("header.lang_ar")}
                  </Button>
                </Box>
              </Box>
            </MotionBox>

            <MotionBox
              component="nav"
              aria-label="Primary"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
              sx={{
                display: "flex",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: 1.25,
                justifyContent: "center",
                width: "100%",
              }}
            >
              {[
                { id: "services", label: t("header.nav.services") },
                { id: "location", label: t("header.nav.location") },
                { id: "gallery", label: t("header.nav.gallery") },
                { id: "staff", label: t("header.nav.staff") },
              ].map((item) => (
                <MotionButton
                  key={item.id}
                  onClick={() => go(item.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: { xs: 120, sm: 160, md: 180 },
                    height: { xs: 40, sm: 44, md: 46 },
                    px: 2,
                    background: "linear-gradient(180deg, #4f63ff 0%, #3b5bff 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: "10px",
                    textDecoration: "none",
                    boxShadow: "0 12px 20px rgba(79,99,255,0.35)",
                    textTransform: "none",
                    "&:hover": { filter: "brightness(1.05)" },
                  }}
                >
                  {item.label}
                </MotionButton>
              ))}
            </MotionBox>
          </Toolbar>
        </Container>

        <Box
          component="span"
          sx={{
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "-16px",
            height: "16px",
            background:
              "radial-gradient(70% 50% at 50% 0%, rgba(79,99,255,0.35), transparent)",
            pointerEvents: "none",
          }}
        />
      </MotionAppBar>
    </>
  );
}
