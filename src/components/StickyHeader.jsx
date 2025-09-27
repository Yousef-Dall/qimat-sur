import React, { useEffect, useRef, useState } from "react";
import "./StickyHeader.css";
import logo from "../assets/logo.png";
import { useI18n } from "../i18n/I18nProvider";

// icons
const Pin = (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 2a7..." /></svg>);
const Clock = (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 2a10..." /></svg>);
const Phone = (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M6.62 10.79..." /></svg>);

export default function StickyHeader() {
  const { t, lang, setLang } = useI18n();

  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inHotzone, setInHotzone] = useState(false);
  const [headerH, setHeaderH] = useState(0);
  const [spaceH, setSpaceH] = useState(0);
  const headerRef = useRef(null);
  const idleRef = useRef(null);

  const IDLE_MS = 4000;

  useEffect(() => {
    const update = () => {
      const h = headerRef.current?.offsetHeight || 0;
      setHeaderH(h);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    update();
    window.addEventListener("resize", update);
    let ro; if (window.ResizeObserver && headerRef.current) {
      ro = new ResizeObserver(update); ro.observe(headerRef.current);
    }
    return () => { window.removeEventListener("resize", update); ro?.disconnect(); };
  }, []);

  useEffect(() => { setSpaceH(visible ? headerH : 0); }, [visible, headerH]);

  useEffect(() => {
    clearTimeout(idleRef.current);
    if (visible && !hovered && !inHotzone) idleRef.current = setTimeout(() => setVisible(false), IDLE_MS);
    return () => clearTimeout(idleRef.current);
  }, [visible, hovered, inHotzone]);

  const go = (id) => {
    setVisible(true);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const mapsUrl =
    "https://maps.app.goo.gl/japUYPhfzxZqo8FU7?g_st=awb";
  const waNumber = "96892405017";

  return (
    <>
      <div className="qsmtHeader__spacer" style={{ height: `${spaceH}px` }} aria-hidden="true" />

      <div
        className="hotzone"
        onMouseEnter={() => { setInHotzone(true); setVisible(true); }}
        onMouseLeave={() => setInHotzone(false)}
        onTouchStart={() => { setInHotzone(true); setVisible(true); }}
        onTouchEnd={() => setInHotzone(false)}
        aria-hidden="true"
      />

      <header
        ref={headerRef}
        className={`qsmtHeader ${visible ? "is-visible" : "is-hidden"}`}
        onMouseEnter={() => { setHovered(true); clearTimeout(idleRef.current); }}
        onMouseLeave={() => { setHovered(false); }}
      >
        <div className="qsmtHeader__top">
          <div className="qsmtHeader__left">
            <img className="qsmtHeader__logo" src={logo} alt="QSMT logo" />
          </div>

          <div className="qsmtHeader__info">
            <a className="qsmtHeader__item" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <Pin /> {t("header.address")}
            </a>
            <div className="qsmtHeader__item">
              <Clock /> {t("header.hours")}
            </div>
            <div className="qsmtHeader__item">
              <Phone />
              <a href="tel:+96892405017">+968 92405017</a>;
              <a href="tel:+96879178056">+968 79178056</a>
            </div>
          </div>

          <div className="qsmtHeader__ctaWrap">
            <a
              className="qsmtHeader__book"
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(lang === "ar" ? "مرحبًا QSMT، أود حجز خدمة." : "Hello QSMT, I’d like to book a service.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("header.book")}
            </a>
            <div className="qsmtHeader__lang">
              <button
                type="button"
                className={`qsmtHeader__langBtn ${lang === "en" ? "is-active" : ""}`}
                onClick={() => setLang("en")}
              >
                {t("header.lang_en")}
              </button>
              <span className="qsmtHeader__sep">|</span>
              <button
                type="button"
                className={`qsmtHeader__langBtn ${lang === "ar" ? "is-active" : ""}`}
                dir="rtl"
                onClick={() => setLang("ar")}
              >
                {t("header.lang_ar")}
              </button>
            </div>
          </div>
        </div>

        <nav className="qsmtHeader__nav" aria-label="Primary">
          <button type="button" className="pill" onClick={() => go("services")}>{t("header.nav.services")}</button>
          <button type="button" className="pill" onClick={() => go("location")}>{t("header.nav.location")}</button>
          <button type="button" className="pill" onClick={() => go("gallery")}>{t("header.nav.gallery")}</button>
          <button type="button" className="pill" onClick={() => go("staff")}>{t("header.nav.staff")}</button>
        </nav>
      </header>
    </>
  );
}
