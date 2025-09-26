import React from "react";
import "./SpecialisedBrands.css";
import { useI18n } from "../i18n/I18nProvider";

// logo files (adjust extensions if yours differ)
import volvo     from "../assets/volvo.png";
import scania    from "../assets/scania.png";
import fuso      from "../assets/fuso.png";
import isuzu     from "../assets/isuzu.png";
import mercedes  from "../assets/mercedes.png";
import man       from "../assets/man.png";
import daihatsuLogo from "../assets/daihatsu.png";
import hyundaiLogo from "../assets/hyundai.png";
import jacLogo from "../assets/JAC.png";

const IMG = { volvo, scania, fuso, isuzu, mercedes, man, daihatsuLogo, hyundaiLogo, jacLogo };

export default function BrandsWeSpecialise() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const title = t(
    "brands.title",
    isAr ? "نحن متخصصون في" : "We Are Specialised In"
  );

  // Order them however you like
  const BRANDS = [
    { id: "volvo",     img: volvo,     en: "Volvo",       ar: "فولفو" },
    { id: "scania",    img: scania,    en: "Scania",      ar: "سكانيا" },
    { id: "fuso",      img: fuso,      en: "FUSO Canter", ar: "فوزو كانتر" },
    { id: "isuzu",     img: isuzu,     en: "ISUZU",       ar: "إيسوزو" },
    { id: "mercedes",  img: mercedes,  en: "Mercedes-Benz", ar: "مرسيدس-بنز" },
    { id: "man",       img: man,       en: "MAN",         ar: "مان" },
    // NEW
    { id: "daihatsu",  img: daihatsuLogo,  en: "Daihatsu",    ar: "دايهاتسو" },
    { id: "hyundai",   img: hyundaiLogo,   en: "Hyundai",     ar: "هيونداي" },
    { id: "jac",       img: jacLogo,       en: "JAC",         ar: "جاك" },
  ];

  return (
    
    <section className={`brands ${isAr ? "brands--rtl" : ""}`}>
        <hr class="brands__rule"></hr>

      <div className="site-container">
        <h2 className="brands__title">{title}</h2>

        <div className="brands__grid">
          {BRANDS.map((b) => (
            <div className="brands__item" key={b.id}>
              {b.img ? (
                <img
                  className="brands__logo"
                  src={b.img}
                  alt={isAr ? b.ar : b.en}
                  loading="lazy"
                />
              ) : (
                <span className="brands__text">{isAr ? b.ar : b.en}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}