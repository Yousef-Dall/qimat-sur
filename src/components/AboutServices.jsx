import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Container,
  Divider,
} from '@mui/material';
import { useI18n } from "../i18n/I18nProvider";

import svcRepair      from "../assets/repair.png";
import svcInspection  from "../assets/inspection.png";
import svcCooling     from "../assets/cooling.png";
import svcPainting    from "../assets/painting.png";
import svcFleet       from "../assets/fleet.png";
import svcPreventive  from "../assets/preventive.png";
import svcEmergency   from "../assets/emergency.png";
import svcManufacture from "../assets/manufacture.png";
import svcContracts   from "../assets/contracts.png";

const SERVICE_IMG = {
  repair:      svcRepair,
  inspection:  svcInspection,
  cooling:     svcCooling,
  painting:    svcPainting,
  fleet:       svcFleet,
  preventive:  svcPreventive,
  emergency:   svcEmergency,
  manufacture: svcManufacture,
  contracts:   svcContracts,
};



export default function AboutServices() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // Ensure we always have an array
  const services = Array.isArray(t("about.services")) ? t("about.services") : [];

  return (
    <Box 
      component="section" 
      id="about" 
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        padding: '40px 0',
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      <Container maxWidth="xl">
        {/* Top divider */}
        <Divider sx={{
          margin: '40px 0',
          background: 'rgba(255, 255, 255, 0.3)',
          height: '2px',
        }} />

        {/* About */}
        <Box sx={{ marginBottom: '32px' }}>
          <Typography component="h2" sx={{
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            marginBottom: '24px',
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}>
            {t("about.heading")}
          </Typography>
          <Typography sx={{
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '16px',
          }}>
            {t("about.body")}
          </Typography>
        </Box>

        {/* Vision / Mission */}
        <Grid container spacing={4} sx={{ marginBottom: '32px' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ marginBottom: '32px' }}>
              <Typography component="h3" sx={{
                fontWeight: 600,
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                marginBottom: '16px',
                color: '#ffffff',
              }}>
                {t("about.vision_h")}
              </Typography>
              <Typography sx={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '16px',
              }}>
                {t("about.vision_t")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ marginBottom: '32px' }}>
              <Typography component="h3" sx={{
                fontWeight: 600,
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                marginBottom: '16px',
                color: '#ffffff',
              }}>
                {t("about.mission_h")}
              </Typography>
              <Typography sx={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '16px',
              }}>
                {t("about.mission_t")}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Middle divider */}
        <Divider sx={{
          margin: '40px 0',
          background: 'rgba(255, 255, 255, 0.3)',
          height: '2px',
        }} />

        {/* Services */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography component="h2" id="services" sx={{
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            marginBottom: '24px',
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}>
            {t("about.services_h")}
          </Typography>
        </Box>

        {/* Services Grid */}
        <Grid 
          container 
          spacing={3}
          role="list"
          aria-label={t("about.services_h")}
        >
          {services.map((s) => {
            const img = SERVICE_IMG[s.id];
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={s.id} role="listitem">
                <Card sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    background: 'rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  },
                }}>
                  <CardContent sx={{ 
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                  }}>
                    <Avatar sx={{
                      width: 80,
                      height: 80,
                      margin: '0 auto 16px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      '& img': {
                        width: '70%',
                        height: '70%',
                        objectFit: 'contain',
                      },
                    }}>
                      {img ? (
                        <img 
                          src={img} 
                          alt={s.title} 
                          loading="lazy" 
                        />
                      ) : (
                        <Box 
                          sx={{ 
                            width: '70%', 
                            height: '70%', 
                            background: 'rgba(255, 255, 255, 0.3)' 
                          }} 
                        />
                      )}
                    </Avatar>
                    <Typography component="h4" sx={{
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      marginBottom: '12px',
                      color: '#ffffff',
                    }}>
                      {s.title}
                    </Typography>
                    <Typography sx={{
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}>
                      {s.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}