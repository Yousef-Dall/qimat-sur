import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import muiTheme from "./theme/muiTheme";

import { I18nProvider, useI18n } from "./i18n/I18nProvider";

import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import FacilityShowcase from "./components/FacilityShowcase";
import AboutServices from "./components/AboutServices";
import SpecialisedBrands from "./components/SpecialisedBrands";
import TechCapacityApproach from "./components/TechCapacityApproach";
import LocationSection from "./components/LocationSection";
import Carousel from "./components/Carousel";
import TeamWhoIsWho from "./components/TeamWhoIsWho";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";

import img1 from "./assets/g1.jpg";
import img2 from "./assets/g2.jpg";
import img3 from "./assets/g3.jpg";
import img4 from "./assets/g4.jpg";
import img5 from "./assets/g5.jpg";
import img6 from "./assets/g6.jpg";
import img7 from "./assets/g7.jpg";
import img8 from "./assets/g8.jpg";
import img9 from "./assets/g9.jpg";

// ---- Split so we can read lang inside the providers cleanly ----
function AppContent() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  // Keep alt keys consistent for the Carousel component
  const gallery = [
    { src: img1, alt_en: "Workshop bay", alt_ar: "منطقة العمل في الورشة" },
    { src: img2, alt_en: "On-site repair", alt_ar: "تصليح موقعي" },
    { src: img3, alt_en: "Fleet check", alt_ar: "فحص أسطول" },
    { src: img4, alt_en: "Parts inventory", alt_ar: "مخزون قطع الغيار" },
    { src: img5, alt_en: "Truck painting", alt_ar: "دهان الشاحنات" },
    { src: img6, alt_en: "Preventive maintenance", alt_ar: "صيانة وقائية" },
    { src: img7, alt_en: "Engine repair", alt_ar: "إصلاح المحرك" },
    { src: img8, alt_en: "Vehicle inspection", alt_ar: "فحص المركبة" },
    {
      src: img9,
      alt_en: "Cooling system service",
      alt_ar: "خدمة نظام التبريد",
    },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {/* Flip document direction when Arabic is active */}
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          direction: isAr ? "rtl" : "ltr",
        }}
        dir={isAr ? "rtl" : "ltr"}
      >
        <Box component="section" sx={{ py: 2 }}>
          <Header />
        </Box>

        <Box component="section" sx={{ py: 2 }}>
          <HeroBanner />
        </Box>

        <Box component="section" sx={{ py: 2 }}>
          <FacilityShowcase />
        </Box>

        <Box component="section" sx={{ py: 2 }}>
          <AboutServices />
        </Box>

        <Box component="section" sx={{ py: 2 }}>
          <SpecialisedBrands />
        </Box>

        <Box component="section" sx={{ py: 2 }}>
          <TechCapacityApproach />
        </Box>

        <Box component="section" sx={{ py: 2 }}>
          <LocationSection />
        </Box>

        <Box component="section" sx={{ py: 2 }}>
          <Carousel
            images={gallery}
            intervalMs={1500}
            aspect="16/9"
            titleEn="Gallery"
            titleAr="المعرض"
            titleAlign="center"
          />
        </Box>

        <Box component="section" sx={{ py: 2 }}>
          <TeamWhoIsWho />
        </Box>

        <Box component="section" sx={{ pt: 2, pb: 0 }}>
          <ContactSection />
        </Box>

        <SiteFooter />
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
