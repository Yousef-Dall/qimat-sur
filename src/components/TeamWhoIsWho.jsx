import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

const normalizeTelHref = (raw) => {
  if (!raw) return "";
  let s = String(raw).trim().replace(/\s+/g, "").replace(/-/g, "");
  if (s.startsWith("00")) s = "+" + s.slice(2);
  if (!s.startsWith("+")) s = "+" + s;
  return s;
};
const tr = (val, lang) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val[lang] ?? val.en ?? val.ar ?? Object.values(val)[0] ?? "";
};

const MBox = motion(Box);
const MTy = motion(Typography);
const MButton = motion(Button);

export default function TeamWhoIsWho() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  const reduce = useReducedMotion();

  const members = Array.isArray(t("team.members")) ? t("team.members") : [];

  const viewport = { once: false, amount: 0.25 };

  const gridStagger = {
    initial: { opacity: 1 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
    viewport,
  };

  const cardVariant = {
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    viewport,
  };

  const innerStagger = {
    initial: { opacity: 1 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
    viewport,
  };

  const fadeUp = {
    initial: { opacity: 0, y: reduce ? 0 : 8 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    viewport,
  };

  const pillVariant = {
    initial: { opacity: 0, y: reduce ? 0 : 6, scale: reduce ? 1 : 0.98 },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    viewport,
  };

  return (
    <Box
      component="section"
      id="staff"
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        color: "#fff",
        py: { xs: 3, md: 4.5 },
        px: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <MBox
          initial={{ scaleX: 0, opacity: 0.6, transformOrigin: "center" }}
          whileInView={{ scaleX: 1, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } }}
          viewport={viewport}
          sx={{ borderTop: "2px solid rgba(255,255,255,.35)", mt: 1, mb: 1.75 }}
        />

        <MTy
          component="h2"
          initial={{ opacity: 0, y: reduce ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
          viewport={viewport}
          sx={{
            textAlign: "center",
            m: "0 0 18px",
            fontFamily: '"Inknut Antiqua", Georgia, "Times New Roman", serif',
            fontWeight: 800,
            fontSize: "32px",
            textShadow: "0 2px 2px rgba(0,0,0,.25)",
          }}
        >
          {t("team.heading")}
        </MTy>

        <MBox
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          sx={{ maxWidth: { md: 1160 }, mx: "auto" }}
        >
          <Grid container spacing={{ xs: 2.75, md: 4 }} justifyContent="center">
            {members.map((m, i) => {
              const featured = i === 0;
              const email = m.email;
              const phone = m.phone;

              return (
                <Grid key={m.id || m.email || i} item xs={12} md={featured ? 12 : 6} sx={{ display: "grid" }}>
                  <MBox
                    variants={cardVariant}
                    whileHover={{ y: reduce ? 0 : -4, boxShadow: "0 22px 44px rgba(0,0,0,.45)" }}
                    transition={{ type: "tween", duration: 0.2 }}
                    sx={{
                      width: "100%",
                      maxWidth: 520,
                      mx: "auto",
                      borderRadius: "14px",
                      p: "18px 20px",
                      background: "#0e0e15",
                      border: "1px solid rgba(255,255,255,.14)",
                      color: "#fff",
                      boxShadow: "0 10px 24px rgba(0,0,0,.12)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: { xs: 0, md: featured ? "auto" : "auto" },
                      "&:active": {
                        transform: "translateY(0)",
                        boxShadow: "0 18px 36px rgba(0,0,0,.35)",
                        transition: "all .1s ease",
                      },
                      "&:focus-within": { outline: "3px solid #6ee7ff", outlineOffset: "4px" },
                    }}
                  >
                    <MBox variants={innerStagger}>
                      <MBox
                        variants={fadeUp}
                        sx={{ display: "flex", alignItems: "center", gap: "12px", mb: "10px" }}
                      >
                        <Box>
                          <MTy
                            className="team__name"
                            variants={fadeUp}
                            sx={{
                              m: 0,
                              fontWeight: 800,
                              fontSize: 18,
                              textAlign: isAr ? "right" : "left",
                            }}
                          >
                            {tr(m.name, lang)}
                          </MTy>

                          <MTy
                            className="team__role"
                            variants={fadeUp}
                            sx={{
                              m: "2px 0 0",
                              color: "#c8d5ff",
                              fontSize: 13.5,
                              textAlign: isAr ? "right" : "left",
                            }}
                          >
                            {tr(m.role, lang)}
                          </MTy>
                        </Box>
                      </MBox>

                      <MTy
                        className="team__bio"
                        variants={fadeUp}
                        sx={{
                          m: "0 0 10px",
                          color: "#e9eef7",
                          lineHeight: 1.55,
                          fontSize: 14.5,
                          textAlign: isAr ? "right" : "left",
                        }}
                      >
                        {tr(m.bio, lang)}
                      </MTy>

                      <MBox
                        className="team__contact"
                        variants={fadeUp}
                        sx={{ display: "flex", flexWrap: "wrap", gap: "8px", mt: "6px" }}
                      >
                        {email && (
                          <MButton
                            component="a"
                            href={`mailto:${email}`}
                            variants={pillVariant}
                            whileHover={{ scale: reduce ? 1 : 1.03 }}
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              px: "10px",
                              py: "8px",
                              borderRadius: "8px",
                              background: "rgba(0,0,0,.28)",
                              border: "1px solid rgba(255,255,255,.18)",
                              color: "#eaf2ff",
                              textDecoration: "none",
                              fontSize: "13.5px",
                              lineHeight: 1,
                              unicodeBidi: "plaintext",
                              "&:hover": { background: "rgba(0,0,0,.4)" },
                              "&:focus-visible": {
                                outline: "3px solid #6ee7ff",
                                outlineOffset: "2px",
                              },
                            }}
                          >
                            <Box
                              component="svg"
                              viewBox="0 0 256 256"
                              width="16"
                              height="16"
                              aria-hidden="true"
                              sx={{ fill: "currentColor" }}
                            >
                              <path d="M224 56H32a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16V72a16 16 0 0 0-16-16Zm0 24v3.72l-92.69 58.93a8 8 0 0 1-8.62 0L32 83.72V80Zm-192 96V100l80.34 51a24 24 0 0 0 25.32 0L224 100v76Z" />
                            </Box>
                            <span dir="ltr">{email}</span>
                          </MButton>
                        )}

                        {phone && (
                          <MButton
                            component="a"
                            href={`tel:${normalizeTelHref(phone)}`}
                            variants={pillVariant}
                            whileHover={{ scale: reduce ? 1 : 1.03 }}
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              px: "10px",
                              py: "8px",
                              borderRadius: "8px",
                              background: "rgba(0,0,0,.28)",
                              border: "1px solid rgba(255,255,255,.18)",
                              color: "#eaf2ff",
                              textDecoration: "none",
                              fontSize: "13.5px",
                              lineHeight: 1,
                              unicodeBidi: "plaintext",
                              "&:hover": { background: "rgba(0,0,0,.4)" },
                              "&:focus-visible": {
                                outline: "3px solid #6ee7ff",
                                outlineOffset: "2px",
                              },
                            }}
                          >
                            <Box
                              component="svg"
                              viewBox="0 0 256 256"
                              width="16"
                              height="16"
                              aria-hidden="true"
                              sx={{ fill: "currentColor" }}
                            >
                              <path d="M223.88 158.85l-49.6-21.26a16 16 0 0 0-16.55 3.1l-22.49 19.61a123.35 123.35 0 0 1-40.38-40.38l19.61-22.49a16 16 0 0 0 3.1-16.55l-21.26-49.6A16 16 0 0 0 41.1 24H32A16 16 0 0 0 16 40a200 200 0 0 0 200 200a16 16 0 0 0 16-16v-9.09a16 16 0 0 0-8.12-14.06Z" />
                            </Box>
                            <span dir="ltr">{phone}</span>
                          </MButton>
                        )}
                      </MBox>
                    </MBox>
                  </MBox>
                </Grid>
              );
            })}
          </Grid>
        </MBox>
      </Container>
    </Box>
  );
}
