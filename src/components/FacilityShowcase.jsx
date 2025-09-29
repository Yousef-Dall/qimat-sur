import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  Divider,
} from '@mui/material';
import { useI18n } from "../i18n/I18nProvider";
import facilityImg from "../assets/qsmt-facility.jpg";

export default function FacilityShowcase({ src = facilityImg }) {
  const { t } = useI18n();

  return (
    <Box 
      component="section" 
      aria-labelledby="facility-title"
      sx={{
        padding: '60px 0',
      }}
    >
      <Container maxWidth="lg">
        <Divider 
          sx={{
            margin: '0 auto 48px',
            background: 'rgba(255, 255, 255, 0.3)',
            height: '2px',
            width: '60%',
          }}
        />
        
        <Typography 
          id="facility-title" 
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            textAlign: 'center',
            marginBottom: '48px',
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          {t("facility.title", "Our Facility")}
        </Typography>

        <Card 
          component="figure" 
          sx={{ 
            margin: 0,
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <Box
            component="img"
            src={src}
            alt={t("facility.alt", "QSMT workshop frontage with signage")}
            loading="lazy"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </Card>
      </Container>
    </Box>
  );
}