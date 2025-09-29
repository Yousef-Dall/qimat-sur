import React from "react";
import "./FacilityShowcase.css";
import { useI18n } from "../i18n/I18nProvider";
import facilityImg from "../assets/qsmt-facility.jpg";

export default function FacilityShowcase({ src = facilityImg }) {
  const { t } = useI18n();

  return (
    <section className="facility" aria-labelledby="facility-title">
      <div className="facility__wrap">
        <hr className="brands__rule" />
        <h2 id="facility-title" className="facility__title">
          {t("facility.title", "Our Facility")}
        </h2>

        <figure className="facility__frame">
          <img
            className="facility__img"
            src={src}
            alt={t("facility.alt", "QSMT workshop frontage with signage")}
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
