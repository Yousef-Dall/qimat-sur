import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useI18n } from "../i18n/I18nProvider";



export default function TechCapacityApproach() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const title = t("tech.heading", isAr ? "التقنية والقدرات" : "Technology & Capabilities");
  
  // Sample tech capabilities - replace with actual data from strings.js
  const capabilities = [
    {
      title: t("tech.diagnostics", isAr ? "التشخيص المتقدم" : "Advanced Diagnostics"),
      description: t("tech.diagnostics_desc", isAr ? "أحدث أجهزة التشخيص" : "Latest diagnostic equipment")
    },
    {
      title: t("tech.tools", isAr ? "الأدوات المتخصصة" : "Specialized Tools"),
      description: t("tech.tools_desc", isAr ? "معدات متخصصة للشاحنات" : "Specialized truck equipment")
    },
    {
      title: t("tech.expertise", isAr ? "الخبرة الفنية" : "Technical Expertise"),
      description: t("tech.expertise_desc", isAr ? "فريق فني متخصص" : "Expert technical team")
    },
  ];

  return (
    <Box 
      component="section" 
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

        <Grid container spacing={4}>
          {capabilities.map((capability, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    background: 'rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#ffffff', 
                      fontWeight: 600, 
                      mb: 2,
                      textAlign: 'center'
                    }}
                  >
                    {capability.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: 1.6,
                      textAlign: 'center'
                    }}
                  >
                    {capability.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}