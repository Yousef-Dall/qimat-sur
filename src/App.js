import React from "react";
import "./styles/globals.css";
import { I18nProvider } from "./i18n/I18nProvider";
import HeroBanner from "./components/HeroBanner";
import AboutServices from "./components/AboutServices";
import TechCapacityApproach from "./components/TechCapacityApproach";
import LocationSection from "./components/LocationSection";
import Carousel from "./components/Carousel";
import TeamWhoIsWho from "./components/TeamWhoIsWho";
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";
import StickyHeader from "./components/Header";
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
    <>
      <></>
      <main className="page">
        <I18nProvider>
          <section className="site-section">
            <div className="site-container">
              <StickyHeader />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <HeroBanner />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <FacilityShowcase />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <AboutServices />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <SpecialisedBrands />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <TechCapacityApproach />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <LocationSection />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <Carousel
                images={gallery}
                intervalMs={3500}
                aspect="16/9"
                titleEn="Gallery"
                titleAr="المعرض"
                titleAlign="center"
              />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <TeamWhoIsWho />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <ContactSection />
            </div>
          </section>
          <SiteFooter />
        </I18nProvider>
      </main>
    </>
  );
}
