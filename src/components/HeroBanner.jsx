import React from "react";
import { Box, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import qsmtLogo from "../assets/logo.png";
import trucksPng from "../assets/trucks.png";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function HeroBanner() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  const reduceMotion = useReducedMotion();

  const brand = t("hero.line1", isAr ? "شركة قمة صور" : "QIMAT SUR");
  const sub = t("hero.line2", isAr ? "للتجارة الحديثة ش.م.م" : "Modern Trading LLC");
  const tagline = t(
    "hero.tagline",
    isAr
      ? "خدمات صيانة وإصلاح موثوقة لمختلف أحجام الشاحنات لضمان استمرارية عمل أسطولك."
      : "Reliable maintenance, repairs, and service for trucks of all sizes – keeping your fleet running."
  );

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4, ease: "easeOut", delay } },
  });
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut", delay } },
  });

  return (
    <Box
      component="section"
      dir={isAr ? "rtl" : "ltr"}
      aria-label="QSMT Hero"
      sx={{
        position: "relative",
        background: "transparent",
        color: "#fff",
        minHeight: { xs: "78vh", md: "clamp(520px, 62vh, 720px)" },
        height: { xs: "86vh", md: "75vh" },
        overflow: "hidden",
      }}
    >
      <motion.div
        {...fadeIn(0.15)}
        style={{
          position: "absolute",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          height: 3,
          borderRadius: 2,
          pointerEvents: "none",
          zIndex: 1,
          width: "80vw",
          background: "rgba(255,255,255,0.65)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          maxWidth: 1280,
          m: "0 auto",
          minHeight: { xs: "72vh", md: "62vh" },
          height: { xs: "72vh", md: "clamp(520px, 62vh, 720px)" },
          display: { xs: "grid", md: "block" },
          gridAutoFlow: { xs: "row", md: "initial" },
          justifyItems: { xs: "center", md: "initial" },
          alignContent: { xs: "start", md: "initial" },
          rowGap: { xs: 2, sm: 2.5 },
          pt: { xs: 6, sm: 7 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, scale: 0.9, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: reduceMotion ? 0 : [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.5, ease: "easeOut", delay: 0.2 },
            scale: { duration: 0.5, ease: "easeOut", delay: 0.2 },
            ...(reduceMotion
              ? {}
              : { y: { duration: 5.2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 0.7 } }),
          }}
          whileHover={reduceMotion ? {} : { scale: 1.03, transition: { duration: 0.15 } }}
          sx={{
            position: { xs: "relative", md: "absolute" },
            top: { xs: "auto", md: "clamp(26px, 6vh, 72px)" },
            left: { xs: "auto", md: isAr ? "auto" : "clamp(18px, 3.6vw, 48px)" },
            right: { xs: "auto", md: isAr ? "clamp(18px, 3.6vw, 48px)" : "auto" },
            transform: { xs: "none", md: "none" },
            width: {
              xs: "clamp(136px, 40vw, 200px)",
              sm: "clamp(150px, 36vw, 220px)",
              md: "clamp(200px, 24vw, 320px)",
            },
            aspectRatio: "1 / 1",
            zIndex: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
              marginLeft: { xs: 0, md: "14%" },
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 10,
                borderRadius: "50%",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
              },
            }}
          >
            <Box component="img" src={qsmtLogo} alt="QSMT logo" sx={{ width: "78%", maxWidth: "86%", height: "auto" }} />
          </Box>
        </MotionBox>

        <MotionBox
          aria-hidden="true"
          initial={{ opacity: 0, x: isAr ? -20 : 20 }}
          animate={{ opacity: 1, x: 0, ...(reduceMotion ? {} : { y: [0, -4, 0, 4, 0] }) }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            ...(reduceMotion ? {} : { repeat: Infinity, repeatType: "loop", times: [0, .25, .5, .75, 1], repeatDelay: 2.5, duration: 6 }),
          }}
          sx={{
            position: { xs: "relative", md: "absolute" },
            bottom: { xs: "auto", md: "20vh" },
            left: { xs: "auto", md: isAr ? 0 : "auto" },
            right: { xs: "auto", md: isAr ? "auto" : 0 },
            transform: {
              xs: isAr ? "scaleX(-1)" : "none",
              md: isAr ? "scaleX(-1)" : "none",
            },
            width: { xs: "min(540px, 92vw)", sm: "min(640px, 92vw)", md: "58vw" },
            maxWidth: { xs: "none", md: 860 },
            zIndex: 1,
            filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.35))",
            pointerEvents: "none",
            "& img": { width: "100%", height: "auto", objectFit: "contain" },
            mt: { xs: 1, sm: 1.5, md: 0 },
          }}
        >
          <img src={trucksPng} alt="" />
        </MotionBox>

        <MotionTypography
          component="h1"
          {...fadeUp(0.35)}
          sx={{
            position: { xs: "relative", md: "absolute" },
            bottom: { xs: "auto", md: "2vh" },
            left: { xs: "auto", md: isAr ? "auto" : "clamp(22px, 3.6vw, 52px)" },
            right: { xs: "auto", md: isAr ? "clamp(22px, 3.6vw, 52px)" : "auto" },
            transform: { xs: "none", md: "none" },
            textAlign: { xs: "center", md: isAr ? "right" : "left" },
            maxWidth: { xs: "92vw", md: "min(520px, 42vw)" },
            lineHeight: 1.04,
            textShadow: "0 4px 14px rgba(0,0,0,0.45)",
            mt: { xs: 0.5, sm: 1, md: 0 },
          }}
        >
          <Box
            component="span"
            sx={{
              display: "block",
              fontWeight: 900,
              fontSize: { xs: "clamp(24px, 7vw, 34px)", sm: "clamp(26px, 6.2vw, 38px)", md: "4vw" },
              letterSpacing: "0.5px",
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            {brand}
          </Box>
          <MotionBox
            component="span"
            {...fadeUp(0.45)}
            sx={{
              display: "block",
              mt: "8px",
              fontWeight: 800,
              fontSize: { xs: "clamp(14px, 4.8vw, 20px)", sm: "clamp(15px, 4.4vw, 22px)", md: "2.3vw" },
              fontFamily: 'Georgia, "Times New Roman", serif',
              ml: { xs: 0, md: isAr ? 0 : "2%" },
            }}
          >
            {sub}
          </MotionBox>
        </MotionTypography>

        <MotionTypography
          {...fadeUp(0.55)}
          sx={{
            position: { xs: "relative", md: "absolute" },
            bottom: { xs: "auto", md: "clamp(26px, 6vh, 48px)" },
            left: { xs: "auto", md: isAr ? "clamp(20px, 3.6vw, 44px)" : "auto" },
            right: { xs: "auto", md: isAr ? "auto" : "clamp(20px, 3.6vw, 44px)" },
            transform: { xs: "none", md: "none" },
            textAlign: { xs: "center !important", md: isAr ? "right" : "left" },
            maxWidth: { xs: "min(92vw, 560px)", md: "min(48ch, 44vw)" },
            fontSize: { xs: "clamp(13px, 3.6vw, 16px)", sm: "clamp(13px, 3.2vw, 17px)", md: "clamp(15px, 1.6vw, 20px)" },
            lineHeight: 1.35,
            textShadow: "0 4px 14px rgba(0,0,0,0.45)",
            mx: { xs: "auto", md: 0 },
            mt: { xs: 1, sm: 1.25, md: 0 },
            pb: { xs: 2, sm: 2.5, md: 0 },
          }}
        >
          {tagline}
        </MotionTypography>
      </Box>
    </Box>
  );
}
