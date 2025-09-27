import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nProvider";
import "./Carousel.css";

export default function GalleryCarousel({
  images = [],
  intervalMs = 500,
  aspect = "16/9",
  titleEn = "Gallery",
  titleAr = "المعرض",
  titleAlign = "center",
}) {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const titleText = isAr ? titleAr : titleEn;

  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const viewportRef = useRef(null);
  const touchStartX = useRef(null);
  const count = images.length;

  // reduced motion?
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goTo = (i) => setIndex(((i % count) + count) % count);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // reset slide on language flip (caption width etc.)
  useEffect(() => { setIndex(0); }, [isAr]);

  const stop = () => clearInterval(timer.current);
  const start = () => {
    if (count <= 1 || prefersReducedMotion) return;
    stop();
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
  };

  // autoplay (basic)
  useEffect(() => {
    start();
    return stop;
  }, [count, intervalMs, prefersReducedMotion]);

  // pause when out of view
  useEffect(() => {
    if (!viewportRef.current || count <= 1 || prefersReducedMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.25 }
    );
    io.observe(viewportRef.current);
    return () => io.disconnect();
  }, [count, prefersReducedMotion]); // start/stop are stable refs

  // touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; stop(); };
  const onTouchMove = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    // do nothing here visually; we keep it simple
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches?.[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    const THRESH = 30; // px
    if (Math.abs(dx) > THRESH) (dx > 0 ? prev() : next());
    start();
  };

  if (!count) return null;

  // title align safety
  const alignValue = ["start", "center", "end"].includes(titleAlign) ? titleAlign : "center";

  return (
    <div
      className={`gc ${isAr ? "gc--ar" : ""}`}
      key={isAr ? "ar" : "en"}
      aria-roledescription="carousel"
      style={{ "--gc-aspect": aspect, "--gc-title-align": alignValue }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <hr className="tca__rule" />
      <h2 className="gc-title" id="gallery">{titleText}</h2>

      <div
        ref={viewportRef}
        className="gc-viewport"
        onMouseEnter={stop}
        onMouseLeave={start}
        onFocus={stop}
        onBlur={start}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prev();
          if (e.key === "ArrowRight") next();
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
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
                alt={isAr ? img.alt_ar || img.alt_en : img.alt_en}
                loading="lazy"
              />
              {(img.caption_en || img.caption_ar) && (
                <div className="gc-caption">
                  {isAr ? img.caption_ar || img.caption_en : img.caption_en}
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
