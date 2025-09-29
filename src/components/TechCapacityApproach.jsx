// src/components/TechCapacityApproach.jsx
import React from "react";
import "./TechCapacityApproach.css";
import { useI18n } from "../i18n/I18nProvider";

import imgTeam    from "../assets/team.jpg";
import imgOffroad from "../assets/emergency.png";
import imgTools   from "../assets/tools.jpg";

import icoService from "../assets/service.png";
import icoMarket  from "../assets/market.png";
import icoAdapt   from "../assets/adapt.png";

const CAPACITY_IMG = {
  team:    imgTeam,
  offroad: imgOffroad,
  tools:   imgTools,
};
const APPROACH_ICON = {
  service: icoService,
  market:  icoMarket,
  adapt:   icoAdapt,
};

const asArray = (x, fallback = []) => (Array.isArray(x) ? x : fallback);

export default function TechCapacityApproach() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // localized content
  const cap = asArray(t("tca.capacity", []));
  const app = asArray(t("tca.approach", []));
  const hCap = t("tca.heading_capacity", "");
  const hApp = t("tca.heading_approach", "");

  return (
    <section className={`tca ${isAr ? "tca--rtl" : ""}`} id="tca" dir={isAr ? "rtl" : "ltr"}>
      <div className="tca__wrap">
        <hr className="brands__rule" />
        {hCap && <h2 className="tca__heading">{hCap}</h2>}

        <ul className="tca__capacityGrid">
          {cap.map((c) => (
            <li className="tca__capCard" key={c.id}>
              <div className="tca__capImage">
                {CAPACITY_IMG[c.id] ? (
                  <img
                    src={CAPACITY_IMG[c.id]}
                    alt={String(c.alt || c.caption || "")}
                    loading="lazy"
                  />
                ) : (
                  <div className="tca__ph tca__ph--rect" aria-hidden="true" />
                )}
              </div>
              <p className="tca__capText">{c.caption}</p>
            </li>
          ))}
        </ul>

        <hr className="tca__rule" />
        {hApp && <h2 className="tca__heading">{hApp}</h2>}

        <div className="tca__approachGrid">
          {app.map((a) => (
            <div className="tca__approachItem" key={a.id}>
              <div className="tca__circle">
                {APPROACH_ICON[a.id] ? (
                  <img
                    src={APPROACH_ICON[a.id]}
                    alt={String(a.title || "")}
                    loading="lazy"
                  />
                ) : (
                  <div className="tca__ph tca__ph--circle" aria-hidden="true" />
                )}
              </div>
              <h4 className="tca__approachTitle">{a.title}</h4>
              <p className="tca__approachText">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
