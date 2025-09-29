import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useI18n } from "../i18n/I18nProvider";

// logos
import volvo     from "../assets/volvo.png";
import scania    from "../assets/scania.png";
import fuso      from "../assets/fuso.png";
import isuzu     from "../assets/isuzu.png";
import mercedes  from "../assets/mercedes.png";
import man       from "../assets/man.png";
import hyundai   from "../assets/hyundai.png";
import JAC       from "../assets/JAC.png";
import Daihatsu  from "../assets/daihatsu.png";

const BrandsSection = styled(Box)(({ dir }) => ({
  padding: '60px 0',
  direction: dir,
}));

const SectionTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  textAlign: 'center',
  marginBottom: '48px',
  color: '#ffffff',
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
});

const BrandCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '120px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
  },
});

const BrandImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '80px',
  objectFit: 'contain',
  filter: 'brightness(1.1) contrast(1.1)',
});

export default function SpecialisedBrands() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // Use your existing strings.js key
  const title = t("specialised.heading", isAr ? "نحن متخصصون في" : "We Are Specialised In");

  // Localized alts (if present in strings.specialised.items), else fallback
  const localizedItems = t("specialised.items") || [];
  const altFor = (id, fallback) => {
    const hit = Array.isArray(localizedItems) ? localizedItems.find((x) => x.id === id) : null;
    return (hit && hit.alt) || fallback;
  };

  // Your full list including the 3 new brands
  const BRANDS = [
    { id: "volvo",     img: volvo,     alt: "Volvo" },
    { id: "scania",    img: scania,    alt: "Scania" },
    { id: "fuso",      img: fuso,      alt: "FUSO Canter" },
    { id: "isuzu",     img: isuzu,     alt: "ISUZU" },
    { id: "mercedes",  img: mercedes,  alt: "Mercedes-Benz" },
    { id: "man",       img: man,       alt: "MAN" },
    { id: "daihatsu",  img: Daihatsu,  alt: "Daihatsu" },
    { id: "hyundai",   img: hyundai,   alt: "Hyundai" },
    { id: "jac",       img: JAC,       alt: "JAC" },
  ];

  return (
    <BrandsSection dir={isAr ? "rtl" : "ltr"}>
      <Container maxWidth="xl">
        <SectionTitle component="h2">
          {title}
        </SectionTitle>

        <Grid container spacing={3} justifyContent="center">
          {BRANDS.map((brand) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={brand.id}>
              <BrandCard>
                <BrandImage
                  src={brand.img}
                  alt={altFor(brand.id, brand.alt)}
                  loading="lazy"
                />
              </BrandCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </BrandsSection>
  );
}