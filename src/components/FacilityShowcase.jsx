import React from "react";
import "./FacilityShowcase.css";
import facilityImg from "../assets/qsmt-facility.jpg";

export default function FacilityShowcase() {
  return (
    <section className="facility" aria-label="QSMT facility photo">
      <div className="facility__wrap">
        <hr class="brands__rule"></hr>
        <img
          className="facility__img"
          src={facilityImg}
          alt="QSMT workshop frontage with signage"
          loading="lazy"
        />
      </div>
    </section>
  );
}
