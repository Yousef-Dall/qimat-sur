import React from "react";
import {
  Box,
  Container,
  Typography,
  Link as MLink,
  Button,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import logo from "../assets/logo.png";

const MBox = motion(Box);
const MTypo = motion(Typography);
const MButton = motion(Button);
const MLinkMotion = motion(MLink);

export default function SiteFooter() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";
  const prefersReduced = useReducedMotion();

  const items = [
    { key: "ph1", icon: <PhoneIcon />, label: "+968 92405017", href: "tel:+96892405017" },
    { key: "ph2", icon: <PhoneIcon />, label: "+968 91394776", href: "tel:+96891394776" },
    {
      key: "wa",
      icon: <WhatsAppIcon />,
      label: "+968 93689729",
      href: `https://wa.me/96893689729?text=${encodeURIComponent(
        isAr ? "مرحبًا QSMT، أود الحجز/الاستفسار." : "Hello QSMT, I’d like to book / ask a question."
      )}`,
      external: true,
    },
    { key: "ig", icon: <InstagramIcon />, label: "@qsmt_oman", href: "https://instagram.com/qsmt_oman", external: true },
    { key: "tw", icon: <TwitterIcon />, label: "@qsmt_oman", href: "https://twitter.com/qsmt_oman", external: true },
    { key: "fb", icon: <FacebookIcon />, label: "Qimat Sur Modern Trading", href: "https://facebook.com/", external: true },
  ];

  const viewport = { once: false, amount: 0.25 };

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: 0.45, ease: "easeOut", delay } },
    viewport,
  });

  const popIn = (delay = 0) => ({
    initial: { opacity: 0, y: 8, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay } },
    viewport,
  });

  const stagger = {
    initial: { opacity: 1 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
    viewport,
  };

  const IconCircle = ({ icon, href, label, external }) => (
    <MLinkMotion
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      underline="none"
      variants={popIn(0)}
      whileHover={
        prefersReduced ? {} : { y: -2, scale: 1.06, transition: { duration: 0.18 } }
      }
      whileTap={prefersReduced ? {} : { scale: 0.97 }}
      sx={{
        width: { xs: 44, md: 48 },
        height: { xs: 44, md: 48 },
        borderRadius: "999px",
        display: "grid",
        placeItems: "center",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.30)",
        color: "#fff",
        transition: "transform 160ms ease, background 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          background: "rgba(255,255,255,0.10)",
          boxShadow: "0 10px 18px rgba(0,0,0,.22)",
        },
      }}
    >
      {icon}
    </MLinkMotion>
  );

  return (
    <Box
      component="footer"
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        mt: 6,
        py: 3,
        background: "linear-gradient(90deg, rgba(0,0,0,.20), rgba(0,0,0,.30))",
        borderTop: "1px solid rgba(255,255,255,.12)",
        marginTop: "0",
      }}
    >
      <Container disableGutters>
        <MBox
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          viewport={viewport}
          sx={{
            maxWidth: "1100px",
            mx: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "auto 1fr auto" },
            alignItems: "center",
            gap: { xs: "10px", md: "24px" },
            px: 0,
          }}
        >
          <MBox
            variants={popIn(0)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.75,
              justifyContent: { xs: "center", md: "flex-start" },
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="QSMT logo"
              sx={{
                width: { xs: 60, md: 72 },
                height: { xs: 60, md: 72 },
                borderRadius: "50%",
                background: "#fff",
                p: "10px",
                boxShadow: "0 12px 22px rgba(0,0,0,.22)",
              }}
            />
            <MTypo
              variants={fadeIn(0.05)}
              sx={{
                fontWeight: 800,
                fontSize: "clamp(20px,2.2vw,24px)",
                textShadow: "0 1px 0 rgba(0,0,0,.25)",
                whiteSpace: "nowrap",
                color: "#fff",
              }}
            >
              {t("footer.contact", isAr ? "تواصل معنا" : "Contact US")}
            </MTypo>
          </MBox>

          <MBox
            variants={fadeIn(0.05)}
            sx={{
              display: "flex",
              flexWrap: { xs: "wrap", md: "nowrap" },
              justifyContent: "center",
              gap: { xs: "8px", md: "10px" },
              minWidth: 0,
              overflow: "hidden",
              padding: "10px",
              paddingRight: { xs: 0, md: "8vw" },
            }}
          >
            {items.map((it) => (
              <IconCircle
                key={it.key}
                icon={it.icon}
                href={it.href}
                label={it.label}
                external={it.external}
              />
            ))}
          </MBox>

          <MBox
            variants={fadeIn(0.1)}
            sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}
          >
            <MButton
              component="a"
              href={`https://wa.me/96893689729?text=${encodeURIComponent(
                isAr ? "مرحبًا QSMT، أود الحجز." : "Hello QSMT, I’d like to book a service."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={
                prefersReduced ? {} : { y: -2, scale: 1.02, transition: { duration: 0.16 } }
              }
              whileTap={prefersReduced ? {} : { scale: 0.98 }}
              sx={{
                borderRadius: "12px",
                px: { xs: 2.25, md: 3 },
                height: { xs: 42, md: 46 },
                fontWeight: 700,
                textTransform: "none",
                color: "#fff",
                background: "linear-gradient(135deg, #087ccf 0%, #1f1b5a 100%)",
                boxShadow: "0 8px 16px rgba(31,27,90,.35)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0668a8 0%, #2a2570 100%)",
                  boxShadow: "0 12px 24px rgba(31,27,90,.45)",
                },
              }}
            >
              {t("footer.book_now", isAr ? "احجز الآن" : "Book Now")}
            </MButton>
          </MBox>
        </MBox>
        <MBox
          variants={fadeIn(0.15)}
          initial="initial"
          whileInView="whileInView"
          viewport={viewport}
          sx={{
            mt: 3,
            height: 1,
            background: "rgba(255,255,255,.12)",
            maxWidth: "1100px",
            mx: "auto",
          }}
        />

        <MTypo
          variants={fadeIn(0.2)}
          initial="initial"
          whileInView="whileInView"
          viewport={viewport}
          sx={{
            fontSize: "12px",
            color: "rgba(255,255,255,.65)",
            textAlign: "center",
            mt: 2,
          }}
        >
          © {new Date().getFullYear()} {t("footer.company_name", "QIMAT SUR Modern Trading LLC")} ·{" "}
          {t("footer.rights", isAr ? "جميع الحقوق محفوظة" : "All rights reserved")}
        </MTypo>
      </Container>
    </Box>
  );
}
