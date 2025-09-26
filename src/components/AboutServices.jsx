import React from "react";
import "./AboutServices.css";
import { useI18n } from "../i18n/I18nProvider";


import svcRepair      from "../assets/repair.png";
import svcInspection  from "../assets/inspection.png";
import svcCooling     from "../assets/cooling.png";
import svcPainting    from "../assets/painting.png";
import svcFleet       from "../assets/fleet.png";
import svcPreventive  from "../assets/preventive.png";
import svcEmergency   from "../assets/emergency.png";
import svcManufacture from "../assets/manufacture.png";
import svcContracts   from "../assets/contracts.png";


const SERVICE_IMG = {
  repair:      svcRepair,
  inspection:  svcInspection,
  cooling:     svcCooling,
  painting:    svcPainting,
  fleet:       svcFleet,
  preventive:  svcPreventive,
  emergency:   svcEmergency,
  manufacture: svcManufacture,
  contracts:   svcContracts
};

export default function AboutServices() {
  const { t } = useI18n();
  const services = t("about.services"); 

  return (
    <section className="aboutServices" id="about">
              <hr class="brands__rule"></hr>

      {/* about */}
      <div className="as__block as__about" id="about">
        <h2 className="as__heading">{t("about.heading")}</h2>
        <p className="as__para">{t("about.body")}</p>
      </div>

      <div className="as__vm">
        <div className="as__block">
          <h3 className="as__subhead">{t("about.vision_h")}</h3>
          <p className="as__para">{t("about.vision_t")}</p>
        </div>
        <div className="as__block">
          <h3 className="as__subhead">{t("about.mission_h")}</h3>
          <p className="as__para">{t("about.mission_t")}</p>
        </div>
      </div>

             <hr class="brands__rule"></hr>


      {/* services*/}
      <h2 className="as__heading as__center" id="services">{t("about.services_h")}</h2>

      <ul className="as__grid">
        {services.map((s) => {
          const img = SERVICE_IMG[s.id];
          return (
            <li className="as__card" key={s.id}>
              <div className="as__bubble">
                {img ? (
                  <img className="as__icon" src={img} alt={s.title} />
                ) : (
                  <div className="as__circleFallback" aria-hidden="true" />
                )}
                <h4 className="as__title">{s.title}</h4>
                <p className="as__desc">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
