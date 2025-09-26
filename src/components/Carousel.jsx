import React, { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nProvider";
import "./Carousel.css";


export default function GalleryCarousel({
  images = [],
  intervalMs = 2500,
  aspect = "16/9",
  titleEn = "Gallery",
  titleAr = "المعرض",
  titleAlign = "center",
}) {
  const { lang } = useI18n();                  
  const currentLang = lang ?? (document?.dir === "rtl" ? "ar" : "en");
  const titleText = currentLang === "ar" ? titleAr : titleEn;

  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const count = images.length;

  useEffect(() => { setIndex(0); }, [currentLang]);

 
  useEffect(() => {
    if (count <= 1) return;
    clearInterval(timer.current);
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(timer.current);
  }, [count, intervalMs]);

  const goTo = (i) => setIndex((i + count) % count);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  if (!count) return null;

 

  return (
    <div className="gc" key={currentLang} aria-roledescription="carousel">
      
<hr className="tca__rule" />
      <h2 className="gc-title"  id="gallery">{titleText}</h2>

      <div
        className="gc-viewport"
        onMouseEnter={() => clearInterval(timer.current)}
        onMouseLeave={() => {
          if (count <= 1) return;
          timer.current = setInterval(() => goTo(index + 1), intervalMs);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prev();
          if (e.key === "ArrowRight") next();
        }}
        tabIndex={0}
        aria-live="polite"
      >
        <div
          className="gc-track"
          style={{ transform: `translate3d(${-index * 100}%,0,0)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="gc-slide" aria-hidden={i !== index}>
              <img
                src={img.src}
                alt={currentLang === "ar" ? img.alt_ar || img.alt_en : img.alt_en}
                loading="lazy"
              />
              {(img.caption_en || img.caption_ar) && (
                <div className="gc-caption">
                  {currentLang === "ar" ? img.caption_ar || img.caption_en : img.caption_en}
                </div>
              )}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button className="gc-nav gc-prev" onClick={prev} aria-label="Previous slide">‹</button>
            <button className="gc-nav gc-next" onClick={next} aria-label="Next slide">›</button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="gc-dots" role="tablist" aria-label="carousel pagination">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              className={`gc-dot ${i === index ? "is-active" : ""}`}
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
