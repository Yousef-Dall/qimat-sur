import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Avatar,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useI18n } from "../i18n/I18nProvider";
import teamImg from "../assets/team.jpg";



export default function TeamWhoIsWho() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const title = t("team.heading", isAr ? "فريق العمل" : "Our Team");
  const description = t("team.description", 
    isAr 
      ? "فريق من الخبراء المتخصصين في صيانة وإصلاح الشاحنات"
      : "A team of experts specialized in truck maintenance and repair"
  );

  return (
    <Box 
      component="section" 
      id="staff" 
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        padding: '60px 0',
        direction: isAr ? "rtl" : "ltr",
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
          {title}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '32px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  background: 'rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <CardContent>
                <Box
                  component="img"
                  src={teamImg}
                  alt={t("team.image_alt", "QSMT team members")}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    marginBottom: '24px',
                  }}
                />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600, 
                    mb: 2 
                  }}
                >
                  {title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6 
                  }}
                >
                  {description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}