import React from "react";
import "./styles/globals.css";
import { I18nProvider } from "./i18n/I18nProvider";
import HeroBanner from "./components/HeroBanner";
import AboutServices from "./components/AboutServices";
import TechCapacityApproach from "./components/TechCapacityApproach"; // ← new import
import LocationSection from "./components/LocationSection";
import Carousel from "./components/Carousel"; // ← new import
import TeamWhoIsWho from "./components/TeamWhoIsWho"; // ← new import
import ContactSection from "./components/ContactSection";
import SiteFooter from "./components/SiteFooter";
import StickyHeader from "./components/StickyHeader";
import FacilityShowcase from "./components/FacilityShowcase";
import SpecialisedBrands from "./components/SpecialisedBrands";
import img1 from "./assets/contracts.png";
import img2 from "./assets/emergency.png";
import img3 from "./assets/fleet.png";
import img4 from "./assets/manufacture.png";
import img5 from "./assets/painting.png";
import img6 from "./assets/preventive.png";
import img7 from "./assets/repair.png";
import img8 from "./assets/inspection.png";
import img9 from "./assets/cooling.png";

export default function App() {
  const gallery = [
    {
      src: img1,
      alt_en: "Workshop bay",
      alt_ar: "ورشة الصيانة",
      caption_en: "Workshop bay",
      caption_ar: "ورشة الصيانة",
    },
    { src: img2, alt_en: "On-site repair", alt_ar: "إصلاح في الموقع" },
    { src: img3, alt_en: "Fleet check", alt_ar: "فحص الأسطول" },
    { src: img4, alt_en: "Parts inventory", alt_ar: "جرد الأجزاء" },
    { src: img5, alt_en: "Truck painting", alt_ar: "طلاء الشاحنات" },
    { src: img6, alt_en: "Preventive maintenance", alt_ar: "الصيانة الوقائية" },
    { src: img7, alt_en: "Engine repair", alt_ar: "إصلاح المحرك" },
    { src: img8, alt_en: "Vehicle inspection", alt_ar: "فحص المركبة" },
    {
      src: img9,
      alt_en: "Cooling system service",
      alt_ar: "خدمة نظام التبريد",
    },
  ];

  return (
    <>
      <></>
      <main className="page">
        <I18nProvider>
          <section className="site-section">
            <div className="site-container">
              <StickyHeader />
              {/* (optional) spacer so the fixed header doesn’t cover your top section) */}
              {/* rest of the page… */}
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
              <TechCapacityApproach /> {/* ← new section */}
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
                titleAlign="center" // or "start" / "end"
              />
            </div>
          </section>
          <section className="site-section">
            <div className="site-container">
              <TeamWhoIsWho /> {/* ← new section */}
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
