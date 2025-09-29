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
import { styled } from '@mui/material/styles';
import { useI18n } from "../i18n/I18nProvider";

const FooterSection = styled(Box)({
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '40px 0 20px',
  marginTop: '60px',
});

const FooterTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '1.2rem',
  marginBottom: '16px',
  color: '#ffffff',
});

const FooterText = styled(Typography)({
  fontSize: '0.9rem',
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.8)',
  marginBottom: '8px',
});

const FooterLink = styled(Link)({
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
});

const CopyrightText = styled(Typography)({
  fontSize: '0.8rem',
  color: 'rgba(255, 255, 255, 0.6)',
  textAlign: 'center',
  marginTop: '20px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
});

export default function SiteFooter() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const currentYear = new Date().getFullYear();

  return (
    <FooterSection component="footer" dir={isAr ? "rtl" : "ltr"}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FooterTitle>
              {t("footer.company", isAr ? "الشركة" : "Company")}
            </FooterTitle>
            <FooterText>
              {t("footer.company_name", isAr ? "شركة قمة صور للتجارة الحديثة" : "QIMAT SUR Modern Trading LLC")}
            </FooterText>
            <FooterText>
              {t("footer.description", isAr ? "خدمات صيانة الشاحنات الموثوقة" : "Reliable truck maintenance services")}
            </FooterText>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterTitle>
              {t("footer.contact", isAr ? "اتصل بنا" : "Contact Us")}
            </FooterTitle>
            <FooterLink href="tel:+96892405017">
              <Phone fontSize="small" />
              +968 92405017
            </FooterLink>
            <FooterLink href="tel:+96879178056">
              <Phone fontSize="small" />
              +968 79178056
            </FooterLink>
            <FooterLink href="mailto:info@qimat-surtrd.com">
              <Email fontSize="small" />
              info@qimat-surtrd.com
            </FooterLink>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterTitle>
              {t("footer.location", isAr ? "الموقع" : "Location")}
            </FooterTitle>
            <FooterLink
              href="https://maps.app.goo.gl/wmLJ7fKsQ4g4ZjHEA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LocationOn fontSize="small" />
              <span>
                {t("footer.address", 
                  isAr 
                    ? "المنطقة الصناعية بولاية بركاء، مسقط، عُمان"
                    : "Barka Industrial Area, Muscat, Oman"
                )}
              </span>
            </FooterLink>
          </Grid>
        </Grid>

        <CopyrightText>
          © {currentYear} {t("footer.company_name", "QIMAT SUR Modern Trading LLC")}. {t("footer.rights", "All rights reserved.")}
        </CopyrightText>
      </Container>
    </FooterSection>
  );
}