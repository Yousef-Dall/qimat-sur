import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useI18n } from "../i18n/I18nProvider";
import mechanic from "../assets/hero-mechanic.jpg";

import { motion } from "framer-motion";
const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

export default function ContactSection() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return t("contact.name", "Your Name");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return t("contact.email", "Your E-mail");
    if (!form.message.trim()) return t("contact.message", "Message");
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ state: "error", msg: err });

    if (form.website) {
      setStatus({ state: "success", msg: t("contact.sent", "Sent! We’ll get back to you shortly.") });
      setForm({ name: "", phone: "", email: "", message: "", website: "" });
      return;
    }

    try {
      setStatus({ state: "loading", msg: t("contact.sending", "Sending…") });

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          website: form.website,
          lang,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed");

      setStatus({ state: "success", msg: t("contact.sent", "Sent! We’ll get back to you shortly.") });
      setForm({ name: "", phone: "", email: "", message: "", website: "" });
    } catch (error) {
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      if (error.message.includes("404") || error.message.includes("Failed to fetch")) {
        setStatus({
          state: "error",
          msg: isLocal
            ? "⚠️ Development Mode: This form works on Vercel. For now, email us at yousef.n.d.2002@gmail.com"
            : "Service temporarily unavailable. Please email us at yousef.n.d.2002@gmail.com",
        });
      } else {
        setStatus({
          state: "error",
          msg: t(
            "contact.err_generic",
            "Couldn’t send right now. Please try again in a minute or email us directly."
          ),
        });
      }
    }
  };

  const fieldSx = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(244,246,255,1)",
      borderRadius: "10px",
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6366f1" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#6366f1",
        borderWidth: 2,
      },
      "& input, & textarea": { color: "#111827 !important" },
    },
    "& .MuiInputLabel-root": { display: "none" }, 
  };


  const formContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <>
      <Container maxWidth="xl">
        <Divider
          sx={{
            my: 5,
            background: "rgba(255,255,255,.3)",
            height: 2,
          }}
        />
      </Container>

      <Box
        component="section"
        id="contact"
        dir={isAr ? "rtl" : "ltr"}
        aria-label={t("contact.heading", "Inquiry and\nFeedback")}
        sx={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: `url(${mechanic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          direction: isAr ? "rtl" : "ltr",
        }}
      >
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,59,118,0.55), rgba(30,25,106,0.25))",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <MotionCard
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            sx={{
              width: "min(560px, 92%)",
              mx: "auto",
              borderRadius: "18px",
              background: "#ffffff",
              boxShadow: "0 30px 60px rgba(0,0,0,.3)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <MotionTypography
                component="h2"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                sx={{
                  fontWeight: 800,
                  fontSize: "clamp(28px,4vw,40px)",
                  textAlign: "center",
                  mb: 3,
                  color: "#111827",
                  whiteSpace: "pre-line",
                }}
              >
                {t("contact.heading", "Inquiry and\nFeedback")}
              </MotionTypography>

              <MotionBox
                component="form"
                onSubmit={onSubmit}
                noValidate
                variants={formContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              >
                <Box
                  component="input"
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    left: "-9999px",
                    top: "-9999px",
                    width: 1,
                    height: 1,
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />

                <MotionBox variants={fadeUp}>
                  <TextField
                    fullWidth
                    name="name"
                    placeholder={t("contact.name", "Your Name")}
                    value={form.name}
                    onChange={onChange}
                    autoComplete="name"
                    variant="outlined"
                    sx={fieldSx}
                  />
                </MotionBox>

                <MotionBox variants={fadeUp}>
                  <TextField
                    fullWidth
                    name="phone"
                    placeholder={t("contact.phone", "Your Contact Number")}
                    value={form.phone}
                    onChange={onChange}
                    autoComplete="tel"
                    variant="outlined"
                    sx={fieldSx}
                  />
                </MotionBox>

                <MotionBox variants={fadeUp}>
                  <TextField
                    fullWidth
                    type="email"
                    name="email"
                    placeholder={t("contact.email", "Your E-mail")}
                    value={form.email}
                    onChange={onChange}
                    autoComplete="email"
                    variant="outlined"
                    sx={fieldSx}
                  />
                </MotionBox>

                <MotionBox variants={fadeUp}>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    name="message"
                    placeholder={t("contact.message", "Message")}
                    value={form.message}
                    onChange={onChange}
                    variant="outlined"
                    sx={fieldSx}
                  />
                </MotionBox>

                {status.state !== "idle" && (
                  <MotionBox variants={fadeUp} sx={{ mb: 2 }} aria-live="polite">
                    <Alert
                      severity={
                        status.state === "success"
                          ? "success"
                          : status.state === "error"
                          ? "error"
                          : "info"
                      }
                      sx={{ borderRadius: "10px" }}
                    >
                      {status.msg}
                    </Alert>
                  </MotionBox>
                )}

                <MotionBox
                  variants={fadeUp}
                  sx={{ textAlign: "center" }}
                >
                  <Button
                    type="submit"
                    disabled={status.state === "loading"}
                    startIcon={
                      status.state === "loading" ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : null
                    }
                    sx={{
                      mt: 1,
                      px: 3,
                      py: 1.25,
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "16px",
                      textTransform: "none",
                      background: "#4f46e5",
                      color: "#fff",
                      boxShadow: "0 8px 16px rgba(31,27,90,.35)",
                      "&:hover": { filter: "brightness(1.05)" },
                      "&:disabled": { opacity: 0.7 },
                    }}
                    component={motion.button}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  >
                    {status.state === "loading"
                      ? t("contact.sending", "Sending…")
                      : t("contact.send", "Send")}
                  </Button>
                </MotionBox>
              </MotionBox>
            </CardContent>
          </MotionCard>
        </Container>
      </Box>
    </>
  );
}
