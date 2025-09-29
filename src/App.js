import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import muiTheme from './theme/muiTheme';
// Old CSS import removed - now using Material UI styling
import { I18nProvider } from "./i18n/I18nProvider";
import HeroBanner from "./components/HeroBanner";
import AboutServices from "./components/AboutServices";
import TechCapacityApproach from "./components/TechCapacityApproach";
import LocationSection from "./components/LocationSection";
import Carousel from "./components/Carousel";
import TeamWhoIsWho from "./components/TeamWhoIsWho";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";
import Header from "./components/Header";
import FacilityShowcase from "./components/FacilityShowcase";
import SpecialisedBrands from "./components/SpecialisedBrands";
import img1 from "./assets/g1.jpg";
import img2 from "./assets/g2.jpg";
import img3 from "./assets/g3.jpg";
import img4 from "./assets/g4.jpg";
import img5 from "./assets/g5.jpg";
import img6 from "./assets/g6.jpg";
import img7 from "./assets/g7.jpg";
import img8 from "./assets/g8.jpg";
import img9 from "./assets/g9.jpg";

export default function App() {
  const gallery = [
    { src: img1, alt_en: "Workshop bay" },
    { src: img2, alt: "On-site repair" },
    { src: img3, alt: "Fleet check" },
    { src: img4, alt: "Parts inventory" },
    { src: img5, alt: "Truck painting" },
    { src: img6, alt: "Preventive maintenance" },
    { src: img7, alt: "Engine repair" },
    { src: img8, alt: "Vehicle inspection" },
    { src: img9, alt_en: "Cooling system service" },
  ];

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', position: 'relative' }}>
        <I18nProvider>
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
          
          <Box component="section" sx={{ py: 2 }}>
            <ContactSection />
          </Box>
          
          <SiteFooter />    
        </I18nProvider>
      </Box>
    </ThemeProvider>
  );
}
