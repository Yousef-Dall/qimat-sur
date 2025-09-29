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
import { styled } from '@mui/material/styles';
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

const AboutSection = styled(Box)(({ dir }) => ({
  padding: '40px 0',
  direction: dir,
}));

const StyledDivider = styled(Divider)({
  margin: '40px 0',
  background: 'rgba(255, 255, 255, 0.3)',
  height: '2px',
});

const AboutBlock = styled(Box)({
  marginBottom: '32px',
});

const VisionMissionGrid = styled(Grid)({
  marginBottom: '32px',
});

const ServiceCard = styled(Card)(({ theme }) => ({
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
}));

const ServiceIcon = styled(Avatar)({
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
});

const ServiceTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '1.1rem',
  textAlign: 'center',
  marginBottom: '12px',
  color: '#ffffff',
});

const ServiceDescription = styled(Typography)({
  textAlign: 'center',
  fontSize: '0.9rem',
  lineHeight: 1.5,
  color: 'rgba(255, 255, 255, 0.9)',
});

const Heading = styled(Typography)({
  fontWeight: 700,
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  marginBottom: '24px',
  color: '#ffffff',
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
});

const SubHeading = styled(Typography)({
  fontWeight: 600,
  fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
  marginBottom: '16px',
  color: '#ffffff',
});

const Paragraph = styled(Typography)({
  fontSize: '1rem',
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '16px',
});

export default function AboutServices() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // Ensure we always have an array
  const services = Array.isArray(t("about.services")) ? t("about.services") : [];

  return (
    <AboutSection 
      component="section" 
      id="about" 
      dir={isAr ? "rtl" : "ltr"}
    >
      <Container maxWidth="xl">
        {/* Top divider */}
        <StyledDivider />

        {/* About */}
        <AboutBlock>
          <Heading component="h2">
            {t("about.heading")}
          </Heading>
          <Paragraph>
            {t("about.body")}
          </Paragraph>
        </AboutBlock>

        {/* Vision / Mission */}
        <VisionMissionGrid container spacing={4}>
          <Grid item xs={12} md={6}>
            <AboutBlock>
              <SubHeading component="h3">
                {t("about.vision_h")}
              </SubHeading>
              <Paragraph>
                {t("about.vision_t")}
              </Paragraph>
            </AboutBlock>
          </Grid>
          <Grid item xs={12} md={6}>
            <AboutBlock>
              <SubHeading component="h3">
                {t("about.mission_h")}
              </SubHeading>
              <Paragraph>
                {t("about.mission_t")}
              </Paragraph>
            </AboutBlock>
          </Grid>
        </VisionMissionGrid>

        {/* Middle divider */}
        <StyledDivider />

        {/* Services */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Heading component="h2" id="services">
            {t("about.services_h")}
          </Heading>
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
                <ServiceCard>
                  <CardContent sx={{ 
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                  }}>
                    <ServiceIcon>
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
                    </ServiceIcon>
                    <ServiceTitle component="h4">
                      {s.title}
                    </ServiceTitle>
                    <ServiceDescription>
                      {s.desc}
                    </ServiceDescription>
                  </CardContent>
                </ServiceCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </AboutSection>
  );
}