import React from "react";
import "./LocationSection.css";
import { useI18n } from "../i18n/I18nProvider";


import mapImg from "../assets/qsmt-map.png";

const PinIcon = (props) => (
  <svg viewBox="0 0 256 256" width="20" height="20" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M128 24a80 80 0 0 0-80 80c0 58.67 72.89 121.8 76 124.44a8 8 0 0 0 10.08 0C135.11 225.8 208 162.67 208 104a80 80 0 0 0-80-80Zm0 184.2C113.52 196.15 64 150.45 64 104a64 64 0 0 1 128 0c0 46.45-49.52 92.15-64 104.2ZM128 72a32 32 0 1 0 32 32a32 32 0 0 0-32-32Zm0 48a16 16 0 1 1 16-16a16 16 0 0 1-16 16Z"/>
  </svg>
);

export default function LocationSection() {
  const { t, lang } = useI18n();

  
  const mapsUrl = "https://maps.app.goo.gl/QpwBGe4HPZCzp3FY6";

  
  const addressEn = "Barka Industrial Area, Barka Province, Al Batinah South Governorate, Muscat, Oman";
  const addressAr = "المنطقة الصناعية بولاية بركاء، محافظة بركاء ، جنوب الباطنة، مسقط ، عُمان";
  const address = lang === "ar" ? addressAr : addressEn;

  return (
    
    <section   className={`location ${lang === "ar" ? "location--rtl" : ""}`}>
      <div className="site-container location__wrap">
        
        <hr className="tca__rule" />
        <h2 id="location" className="location__title">
          {t("location.title", lang === "ar" ? "الموقع" : "Location")}
        </h2>

      
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="location__address"
          aria-label={t("location.openMaps", "Open in Google Maps")}
        >
          <PinIcon className="location__icon" />
          <span className="location__text">{address}</span>
        </a>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="location__map">
          <img src={mapImg} alt={t("location.mapAlt", "Open the location in Google Maps")} />
        </a>
       

        
        
      </div>
    </section>
  );
}
