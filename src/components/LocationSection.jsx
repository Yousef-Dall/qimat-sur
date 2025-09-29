import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  Divider,
  Link,
} from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useI18n } from "../i18n/I18nProvider";
import mapImg from "../assets/qsmt-map.png";

const LocationSectionContainer = styled(Box)(({ dir }) => ({
  padding: '60px 0',
  direction: dir,
}));

const LocationTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  textAlign: 'center',
  marginBottom: '32px',
  color: '#ffffff',
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
});

const AddressLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  padding: '16px 24px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '1.1rem',
  textAlign: 'center',
  marginBottom: '32px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
  },
});

const MapFrame = styled(Card)({
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
});

const MapImage = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
  objectFit: 'cover',
});

const StyledDivider = styled(Divider)({
  margin: '0 auto 48px',
  background: 'rgba(255, 255, 255, 0.3)',
  height: '2px',
  width: '60%',
});

export default function LocationSection() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // Prefer strings.js keys (with safe fallbacks)
  const title = t("location.heading", isAr ? "الموقع" : "Location");
  const address = t(
    "location.address_full",
    isAr
      ? "المنطقة الصناعية بولاية بركاء، محافظة جنوب الباطنة، مسقط، عُمان"
      : "Barka Industrial Area, Barka Province, Al Batinah South Governorate, Muscat, Oman"
  );
  const openMaps = t("location.open_maps", isAr ? "افتح في خرائط جوجل" : "Open in Google Maps");

  // Your map link
  const mapsUrl = "https://maps.app.goo.gl/QpwBGe4HPZCzp3FY6";

  return (
    <LocationSectionContainer component="section" dir={isAr ? "rtl" : "ltr"}>
      <Container maxWidth="lg">
        <StyledDivider />

        <LocationTitle id="location" component="h2">
          {title}
        </LocationTitle>

        {/* Clickable address with pin icon */}
        <AddressLink
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={openMaps}
        >
          <LocationIcon />
          <Typography component="span">
            {address}
          </Typography>
        </AddressLink>

        {/* Map image */}
        <MapFrame component="figure" sx={{ margin: 0 }}>
          <MapImage
            src={mapImg}
            alt={t("location.map_alt", "Map showing QSMT location in Barka Industrial Area")}
            loading="lazy"
          />
        </MapFrame>
      </Container>
    </LocationSectionContainer>
  );
}