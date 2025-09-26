import React from "react";
import "./HeroBanner.css";
import { useI18n } from "../i18n/I18nProvider";

// Update these paths to match your assets
import qsmtLogo from "../assets/logo.png";
import trucksPng from "../assets/trucks.png";

export default function Hero() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const brand = t("hero.brand", isAr ? "صور قمة شرمة" : "QIMAT SUR");
  const sub   = t("hero.sub",   isAr ? "شركة مودرن للتجارة ش.م.م" : "Modern Trading LLC");
  const tagline = t(
    "hero.tagline",
    isAr
      ? "صيانة وإصلاح وخدمات موثوقة لجميع أحجام الشاحنات – للحفاظ على أسطولك في العمل"
      : "Reliable maintenance, repairs, and service for trucks of all sizes – keeping your fleet running"
  );

  return (
    <section
      className={`hero ${isAr ? "hero--rtl" : ""}`}
      dir={isAr ? "rtl" : "ltr"}
      aria-label="QSMT Hero"
    >
      <div className="hero__rule" />

      {/* White circular badge */}
      <div className="hero__badge">
        <div className="hero__badgeCircle">
          <img src={qsmtLogo} alt="QSMT logo" className="hero__badgeLogo" />
        </div>
      </div>

      {/* Trucks */}
      <div className="hero__trucks" aria-hidden="true">
        <img src={trucksPng} alt="" />
      </div>

      {/* Brand lockup */}
      <h1 className="hero__brandLockup">
        <span className="hero__brand">{brand}</span>
        <span className="hero__sub">{sub}</span>
      </h1>

      {/* Tagline */}
      <p className="hero__tagline">{tagline}</p>
    </section>
  );
}
