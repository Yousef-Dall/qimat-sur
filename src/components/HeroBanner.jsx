import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

import { useI18n } from "../i18n/I18nProvider";
import qsmtLogo from "../assets/logo.png";
import trucksPng from "../assets/trucks.png";



export default function HeroBanner() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // Use the keys that exist in strings.js
  const brand = t("hero.line1", isAr ? "شركة قمة صور" : "QIMAT SUR");
  const sub = t("hero.line2", isAr ? "للتجارة الحديثة ش.م.م" : "Modern Trading LLC");
  const tagline = t(
    "hero.tagline",
    isAr
      ? "خدمات صيانة وإصلاح موثوقة لمختلف أحجام الشاحنات لضمان استمرارية عمل أسطولك."
      : "Reliable maintenance, repairs, and service for trucks of all sizes – keeping your fleet running."
  );

  return (
    <Box
      component="section"
      dir={isAr ? "rtl" : "ltr"}
      aria-label="QSMT Hero"
      sx={{
        position: 'relative',
        background: 'transparent',
        color: '#fff',
        minHeight: 'clamp(520px, 62vh, 720px)',
        height: '85vh',
        overflow: 'hidden',
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: '14px',
          left: '3%',
          right: '3%',
          height: '3px',
          borderRadius: '2px',
          background: 'rgba(255, 255, 255, 0.65)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      
      <Box
        sx={{
          position: 'relative',
          maxWidth: '1280px',
          margin: '0 auto',
          minHeight: '62vh',
          height: 'clamp(520px, 62vh, 720px)',
        }}
      >
        {/* Logo badge */}
        <Box
          sx={{
            position: 'absolute',
            left: isAr ? 'auto' : 'clamp(18px, 3.6vw, 48px)',
            right: isAr ? 'clamp(18px, 3.6vw, 48px)' : 'auto',
            top: 'clamp(26px, 6vh, 72px)',
            width: 'clamp(200px, 24vw, 320px)',
            aspectRatio: '1 / 1',
            zIndex: 3,
            '@media (max-width: 900px)': {
              left: '50% !important',
              right: 'auto !important',
              top: 'clamp(20px, 5vh, 40px)',
              transform: 'translateX(-50%)',
              width: 'clamp(180px, 42vw, 280px)',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 18px 40px rgba(0, 0, 0, 0.28)',
              marginLeft: '14%',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: '10px',
                borderRadius: '50%',
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)',
                pointerEvents: 'none',
              },
              '@media (max-width: 900px)': {
                marginLeft: '0',
              },
            }}
          >
            <Box
              component="img"
              src={qsmtLogo} 
              alt="QSMT logo"
              sx={{
                width: '78%',
                maxWidth: '86%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>

        {/* Decorative trucks image */}
        <Box 
          aria-hidden="true"
          sx={{
            position: 'absolute',
            right: isAr ? 'auto' : '0',
            left: isAr ? '0' : 'auto',
            bottom: '20vh',
            width: '58vw',
            maxWidth: '860px',
            zIndex: 1,
            filter: 'drop-shadow(0 18px 24px rgba(0, 0, 0, 0.35))',
            pointerEvents: 'none',
            transform: isAr ? 'scaleX(-1)' : 'none',
            '& img': {
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            },
            '@media (max-width: 900px)': {
              width: '90vw',
              right: isAr ? 'auto' : '50%',
              left: isAr ? '50%' : 'auto',
              transform: isAr ? 'translateX(-50%) scaleX(-1)' : 'translateX(50%)',
            },
          }}
        >
          <img src={trucksPng} alt="" />
        </Box>

        {/* Brand + sub */}
        <Typography 
          component="h1"
          sx={{
            position: 'absolute',
            left: isAr ? 'auto' : 'clamp(22px, 3.6vw, 52px)',
            right: isAr ? 'clamp(22px, 3.6vw, 52px)' : 'auto',
            bottom: '2vh',
            margin: 0,
            zIndex: 3,
            maxWidth: 'min(520px, 42vw)',
            lineHeight: 1.04,
            textShadow: '0 4px 14px rgba(0, 0, 0, 0.45)',
            textAlign: isAr ? 'right' : 'left',
            '@media (max-width: 900px)': {
              left: '50% !important',
              right: 'auto !important',
              transform: 'translateX(-50%)',
              bottom: 'clamp(160px, 22vh, 200px)',
              textAlign: 'center !important',
              maxWidth: '90vw',
            },
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'block',
              fontWeight: 900,
              fontSize: '5.3vw',
              letterSpacing: '0.5px',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            {brand}
          </Box>
          <Box
            component="span"
            sx={{
              display: 'block',
              marginTop: '8px',
              fontWeight: 800,
              fontSize: '3vw',
              fontFamily: 'Georgia, "Times New Roman", serif',
              marginLeft: '2%',
              '@media (max-width: 900px)': {
                marginLeft: '0',
              },
            }}
          >
            {sub}
          </Box>
        </Typography>

        {/* Tagline */}
        <Typography
          sx={{
            position: 'absolute',
            right: isAr ? 'auto' : 'clamp(20px, 3.6vw, 44px)',
            left: isAr ? 'clamp(20px, 3.6vw, 44px)' : 'auto',
            bottom: 'clamp(26px, 6vh, 48px)',
            zIndex: 3,
            maxWidth: 'min(48ch, 44vw)',
            fontSize: 'clamp(15px, 1.6vw, 20px)',
            lineHeight: 1.35,
            textShadow: '0 4px 14px rgba(0, 0, 0, 0.45)',
            textAlign: isAr ? 'right' : 'left',
            '@media (max-width: 900px)': {
              left: '50% !important',
              right: 'auto !important',
              transform: 'translateX(-50%)',
              bottom: 'clamp(24px, 6vh, 40px)',
              textAlign: 'center !important',
              maxWidth: '90vw',
            },
          }}
        >
          {tagline}
        </Typography>
      </Box>
    </Box>
  );
}