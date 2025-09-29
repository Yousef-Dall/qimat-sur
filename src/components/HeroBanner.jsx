import React from "react";
import "./HeroBanner.css";
import { useI18n } from "../i18n/I18nProvider";

import qsmtLogo from "../assets/logo.png";
import trucksPng from "../assets/trucks.png";

export default function HeroBanner() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // Use the keys that exist in strings.js
  const brand = t("hero.line1", isAr ? "شركة قمة صور" : "QIMAT SUR");
  const sub   = t("hero.line2", isAr ? "للتجارة الحديثة ش.م.م" : "Modern Trading LLC");
  const tagline = t(
    "hero.tagline",
    isAr
      ? "خدمات صيانة وإصلاح موثوقة لمختلف أحجام الشاحنات لضمان استمرارية عمل أسطولك."
      : "Reliable maintenance, repairs, and service for trucks of all sizes – keeping your fleet running."
  );

  return (
    <section
      className={`hero ${isAr ? "hero--rtl" : ""}`}
      dir={isAr ? "rtl" : "ltr"}
      aria-label="QSMT Hero"
    >
      <div className="hero__rule" />

      <div className="hero__inner">
        {/* Logo badge */}
        <div className="hero__badge">
          <div className="hero__badgeCircle">
            <img src={qsmtLogo} alt="QSMT logo" className="hero__badgeLogo" />
          </div>
        </div>

        {/* Decorative trucks image */}
        <div className="hero__trucks" aria-hidden="true">
          <img src={trucksPng} alt="" />
        </div>

        {/* Brand + sub */}
        <h1 className="hero__title">
          <span className="hero__brand">{brand}</span>
          <span className="hero__sub">{sub}</span>
        </h1>

        {/* Tagline */}
        <p className="hero__tagline">{tagline}</p>
      </div>
    </section>
  );
}
