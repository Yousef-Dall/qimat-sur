import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  Divider,
} from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import { useI18n } from "../i18n/I18nProvider";



export default function SiteFooter() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      dir={isAr ? "rtl" : "ltr"}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '40px 0 20px',
        marginTop: '60px',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1.2rem',
                marginBottom: '16px',
                color: '#ffffff',
              }}
            >
              {t("footer.company", isAr ? "الشركة" : "Company")}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '8px',
              }}
            >
              {t("footer.company_name", isAr ? "شركة قمة صور للتجارة الحديثة" : "QIMAT SUR Modern Trading LLC")}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '8px',
              }}
            >
              {t("footer.description", isAr ? "خدمات صيانة الشاحنات الموثوقة" : "Reliable truck maintenance services")}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1.2rem',
                marginBottom: '16px',
                color: '#ffffff',
              }}
            >
              {t("footer.contact", isAr ? "اتصل بنا" : "Contact Us")}
            </Typography>
            <Link 
              href="tel:+96892405017"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontSize: '0.9rem',
                '&:hover': {
                  color: '#ffffff',
                  textDecoration: 'underline',
                },
              }}
            >
              <Phone fontSize="small" />
              +968 92405017
            </Link>
            <Link 
              href="tel:+96879178056"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontSize: '0.9rem',
                '&:hover': {
                  color: '#ffffff',
                  textDecoration: 'underline',
                },
              }}
            >
              <Phone fontSize="small" />
              +968 79178056
            </Link>
            <Link 
              href="mailto:info@qimat-surtrd.com"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontSize: '0.9rem',
                '&:hover': {
                  color: '#ffffff',
                  textDecoration: 'underline',
                },
              }}
            >
              <Email fontSize="small" />
              info@qimat-surtrd.com
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1.2rem',
                marginBottom: '16px',
                color: '#ffffff',
              }}
            >
              {t("footer.location", isAr ? "الموقع" : "Location")}
            </Typography>
            <Link
              href="https://maps.app.goo.gl/wmLJ7fKsQ4g4ZjHEA"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontSize: '0.9rem',
                '&:hover': {
                  color: '#ffffff',
                  textDecoration: 'underline',
                },
              }}
            >
              <LocationOn fontSize="small" />
              <span>
                {t("footer.address", 
                  isAr 
                    ? "المنطقة الصناعية بولاية بركاء، مسقط، عُمان"
                    : "Barka Industrial Area, Muscat, Oman"
                )}
              </span>
            </Link>
          </Grid>
        </Grid>

        <Typography
          sx={{
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          © {currentYear} {t("footer.company_name", "QIMAT SUR Modern Trading LLC")}. {t("footer.rights", "All rights reserved.")}
        </Typography>
      </Container>
    </Box>
  );
}