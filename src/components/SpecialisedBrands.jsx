import React from "react";
import "./SpecialisedBrands.css";
import { useI18n } from "../i18n/I18nProvider";

// logos
import volvo     from "../assets/volvo.png";
import scania    from "../assets/scania.png";
import fuso      from "../assets/fuso.png";
import isuzu     from "../assets/isuzu.png";
import mercedes  from "../assets/mercedes.png";
import man       from "../assets/man.png";
import hyundai   from "../assets/hyundai.png";
import JAC       from "../assets/JAC.png";
import Daihatsu  from "../assets/daihatsu.png";

export default function BrandsWeSpecialise() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // Use your existing strings.js key
  const title = t("specialised.heading", isAr ? "نحن متخصصون في" : "We Are Specialised In");

  // Localized alts (if present in strings.specialised.items), else fallback
  const localizedItems = t("specialised.items") || [];
  const altFor = (id, fallback) => {
    const hit = Array.isArray(localizedItems) ? localizedItems.find((x) => x.id === id) : null;
    return (hit && hit.alt) || fallback;
  };

  // Your full list including the 3 new brands
  const BRANDS = [
    { id: "volvo",     img: volvo,     alt: "Volvo" },
    { id: "scania",    img: scania,    alt: "Scania" },
    { id: "fuso",      img: fuso,      alt: "FUSO Canter" },
    { id: "isuzu",     img: isuzu,     alt: "ISUZU" },
    { id: "mercedes",  img: mercedes,  alt: "Mercedes-Benz" },
    { id: "man",       img: man,       alt: "MAN" },
    { id: "daihatsu",  img: Daihatsu,  alt: "Daihatsu" },
    { id: "hyundai",   img: hyundai,   alt: "Hyundai" },
    { id: "jac",       img: JAC,       alt: "JAC" },
  ];

  return (
    <section className={`brands ${isAr ? "brands--rtl" : ""}`} dir={isAr ? "rtl" : "ltr"}>
      <div className="site-container">
        <h2 className="brands__title">{title}</h2>

        <div className="brands__grid">
          {BRANDS.map((b) => (
            <div className="brands__item" key={b.id}>
              {b.img ? (
                <img
                  className="brands__logo"
                  src={b.img}
                  alt={altFor(b.id, b.alt)}
                  loading="lazy"
                />
              ) : (
                <span className="brands__text">{b.alt}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
