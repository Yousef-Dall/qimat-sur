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

const IMG = { volvo, scania, fuso, isuzu, mercedes, man };

export default function SpecialisedBrands() {
  const { t } = useI18n();
  const heading = t("specialised.heading", "");
  const items = t("specialised.items", []);

  return (
    <section className="brands" aria-labelledby="brands-heading">
      <div className="brands__wrap">
        <hr className="brands__rule" />
        {heading && (
          <h2 id="brands-heading" className="brands__heading">{heading}</h2>
        )}

        <ul className="brands__grid">
          {Array.isArray(items) && items.map((b) => (
            <li key={b.id} className="brands__cell">
              {IMG[b.id] ? (
                <img
                  className="brands__logo"
                  src={IMG[b.id]}
                  alt={b.alt || ""}
                  loading="lazy"
                />
              ) : (
                <div className="brands__ph" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
