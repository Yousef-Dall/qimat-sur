import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  Grid,
  Slide,
  useScrollTrigger,
  Fade,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as ClockIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import logo from "../assets/logo.png";
import { useI18n } from "../i18n/I18nProvider";



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

  // Measure header height to push content down when visible
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

  // Spacer height equals header height only when visible
  useEffect(() => { 
    setSpaceH(visible ? headerH : 0); 
  }, [visible, headerH]);

  // Auto-hide after idle if not hovered and not in hotzone
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
      {/* Spacer to push page down when header is visible */}
      <Box
        sx={{
          height: `${spaceH}px`,
          transition: 'height 220ms ease',
        }}
        aria-hidden="true"
      />

      {/* Top hotzone: only hovering here shows the header */}
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
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '160px',
          zIndex: 9998,
        }}
      />

      <AppBar
        ref={headerRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backdropFilter: 'saturate(1.1) blur(6px)',
          background: 'rgba(255, 255, 255, 0.86)',
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)',
          transform: visible ? 'translateY(0)' : 'translateY(-110%)',
          opacity: visible ? 1 : 0,
          transition: 'transform 220ms ease, opacity 220ms ease',
          color: '#4b5563',
        }}
        onMouseEnter={() => { 
          setHovered(true); 
          clearTimeout(idleRef.current); 
        }}
        onMouseLeave={() => { setHovered(false); }}
        dir={isAr ? "rtl" : "ltr"}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: '10px 0', flexDirection: 'column', gap: 2 }}>
            {/* Top row */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              width: '100%',
              gap: 2 
            }}>
              {/* Logo */}
              <Box>
                <Box
                  component="img"
                  src={logo} 
                  alt="QSMT logo"
                  sx={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'contain',
                    background: '#fff',
                  }}
                />
              </Box>

              {/* Info section */}
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                '@media (max-width: 900px)': {
                  display: 'none'
                }
              }}>
                <Box 
                  component="a"
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    minWidth: '220px',
                    color: '#4b5563',
                    fontSize: '14px',
                    '& a': {
                      color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    },
                  }}
                >
                  <LocationIcon fontSize="small" />
                  <Typography variant="body2">
                    {t("header.address")}
                  </Typography>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    minWidth: '220px',
                    color: '#4b5563',
                    fontSize: '14px',
                    '& a': {
                      color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    },
                  }}
                >
                  <ClockIcon fontSize="small" />
                  <Typography variant="body2">
                    {t("header.hours")}
                  </Typography>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    minWidth: '220px',
                    color: '#4b5563',
                    fontSize: '14px',
                    '& a': {
                      color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    },
                  }}
                >
                  <PhoneIcon fontSize="small" />
                  <Typography variant="body2">
                    <a href="tel:+96892405017">+968 92405017</a>
                    <span>&nbsp;·&nbsp;</span>
                    <a href="tel:+96879178056">+968 79178056</a>
                  </Typography>
                </Box>
              </Box>

              {/* CTA and Language */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end',
                gap: 1
              }}>
                <Button
                  component="a"
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                    isAr ? "مرحبًا QSMT، أود حجز خدمة." : "Hello QSMT, I'd like to book a service."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: '10px',
                    background: '#1f1b5a',
                    color: '#fff',
                    fontWeight: 700,
                    padding: '10px 18px',
                    textTransform: 'none',
                    boxShadow: '0 8px 16px rgba(31, 27, 90, 0.35)',
                    '&:hover': {
                      background: '#2a2570',
                      boxShadow: '0 12px 24px rgba(31, 27, 90, 0.45)',
                    },
                  }}
                >
                  {t("header.book")}
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    onClick={() => setLang("en")}
                    sx={{
                      color: lang === "en" ? '#1f1b5a' : '#6b7280',
                      fontWeight: lang === "en" ? 700 : 400,
                      textTransform: 'none',
                      minWidth: 'auto',
                      padding: '4px 8px',
                      '&:hover': {
                        background: 'rgba(31, 27, 90, 0.1)',
                      },
                    }}
                  >
                    {t("header.lang_en")}
                  </Button>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>|</Typography>
                  <Button
                    onClick={() => setLang("ar")}
                    dir="rtl"
                    sx={{
                      color: lang === "ar" ? '#1f1b5a' : '#6b7280',
                      fontWeight: lang === "ar" ? 700 : 400,
                      textTransform: 'none',
                      minWidth: 'auto',
                      padding: '4px 8px',
                      '&:hover': {
                        background: 'rgba(31, 27, 90, 0.1)',
                      },
                    }}
                  >
                    {t("header.lang_ar")}
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Navigation row */}
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              justifyContent: 'center',
              width: '100%'
            }}>
              <Button 
                onClick={() => go("services")}
                sx={{
                  borderRadius: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#4b5563',
                  fontWeight: 500,
                  textTransform: 'none',
                  margin: '0 4px',
                  padding: '6px 16px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                {t("header.nav.services")}
              </Button>
              <Button 
                onClick={() => go("location")}
                sx={{
                  borderRadius: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#4b5563',
                  fontWeight: 500,
                  textTransform: 'none',
                  margin: '0 4px',
                  padding: '6px 16px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                {t("header.nav.location")}
              </Button>
              <Button 
                onClick={() => go("gallery")}
                sx={{
                  borderRadius: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#4b5563',
                  fontWeight: 500,
                  textTransform: 'none',
                  margin: '0 4px',
                  padding: '6px 16px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                {t("header.nav.gallery")}
              </Button>
              <Button 
                onClick={() => go("staff")}
                sx={{
                  borderRadius: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#4b5563',
                  fontWeight: 500,
                  textTransform: 'none',
                  margin: '0 4px',
                  padding: '6px 16px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                {t("header.nav.staff")}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}