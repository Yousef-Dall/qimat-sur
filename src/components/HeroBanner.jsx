import React from "react";
import "./HeroBanner.css";
import { useI18n } from "../i18n/I18nProvider";

import qsmtLogo from "../assets/logo.png";
import trucksPng from "../assets/trucks.png";

export default function Hero() {
  const { t, lang } = useI18n();

  return (
    <section
      className={`hero ${lang === "ar" ? "hero--rtl" : ""}`}
      aria-label="QSMT Hero"
    >
      <div className="hero__rule" />

      <div className="hero__inner">
        <div className="hero__badge">
          <div className="hero__badgeCircle">
            <img src={qsmtLogo} alt="QSMT logo" className="hero__badgeLogo" />
          </div>
        </div>

        <div className="hero__trucks">
          <img src={trucksPng} alt="" aria-hidden="true" />
        </div>

        <h1 className="hero__title">
          <span className="hero__brand">QIMAT SUR</span>
          <span className="hero__sub">Modern Trading LLC</span>
        </h1>

        <p className="hero__tagline">
          {t(
            "hero.tagline",
            "Reliable maintenance, repairs, and service for trucks of all sizes – keeping your fleet running"
          )}
        </p>
      </div>
    </section>
  );
}
