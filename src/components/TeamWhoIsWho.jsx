
import React from "react";
import "./TeamWhoIsWho.css";
import { useI18n } from "../i18n/I18nProvider";


const normalizeTelHref = (raw) => {
  if (!raw) return "";
  let s = String(raw).trim().replace(/\s+/g, "").replace(/-/g, "");
  if (s.startsWith("00")) s = "+" + s.slice(2);
  if (!s.startsWith("+")) s = "+" + s;
  return s;
};
const tr = (val, lang) => {
  if (!val) return "";
  if (typeof val === "string") return val;

  if (val[lang]) return val[lang];
  if (lang === "ar" && val.ar) return val.ar;
  if (lang === "en" && val.en) return val.en;
  return Object.values(val)[0] || "";
};


const MailIcon = (p) => (
  <svg viewBox="0 0 256 256" width="16" height="16" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M224 56H32a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16V72a16 16 0 0 0-16-16Zm0 24v3.72l-92.69 58.93a8 8 0 0 1-8.62 0L32 83.72V80Zm-192 96V100l80.34 51a24 24 0 0 0 25.32 0L224 100v76Z"/>
  </svg>
);
const PhoneIcon = (p) => (
  <svg viewBox="0 0 256 256" width="16" height="16" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M223.88 158.85l-49.6-21.26a16 16 0 0 0-16.55 3.1l-22.49 19.61a123.35 123.35 0 0 1-40.38-40.38l19.61-22.49a16 16 0 0 0 3.1-16.55l-21.26-49.6A16 16 0 0 0 41.1 24H32A16 16 0 0 0 16 40a200 200 0 0 0 200 200a16 16 0 0 0 16-16v-9.09a16 16 0 0 0-8.12-14.06Z"/>
  </svg>
);


export default function WhoIsWho({ members: propMembers }) {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";


  const members =
    propMembers ??
    [
      {
        id: "mubarak",
        name: "Mubarak Hamad Al Dawoodi",
        role: "Shareholder & Managing Director",
        bio:
          "Over 35 years of experience in transport & road safety management, including maintenance and fleet management in leading companies in Oman and the region.",
        email: "m.aldawoodi@qsmtoman.com",
        phone: "0096891394776",
      },
      {
        id: "yaser",
        name: "Eng. Yaser Abdul Aziz Gad",
        role: "Shareholder & Managing Director",
        bio:
          "Mechanical engineer with more than 25 years in mechanics workshops and vehicle maintenance in Egypt, Oman, and the region.",
        email: "yassr.abdulaziz@qsmtoman.com",
        phone: "0096892405017",
      },
      {
        id: "sakher",
        name: "Sakher. Mubarak Al Dawoodi",
        role: "Shareholder and Marketing & PR Manager",
        bio:
          "Omani graduate in business management with strong knowledge of Omani laws and procedures and a network of contacts across the market.",
       
        phone: "0096879677735",
      },
      {
        id: "dhiaa_sup",
        name: "Taha Mamdouh Mohamed",
        role: "Maintenance Supervisor",
        bio:
          "Mechanical engineer specialized in maintenance and repair of heavy trucks and large equipment, with 8+ years’ experience.",
        email: "operations@qsmtoman.com",
        phone: "0096893689729",
      },
      {
        id: "dhiaa_md",
        name: "Dhiaa Ahmed Baddawi",
        role: "Shareholder & Managing Director",
        bio:
          "Experienced in logistics and customer-care fields with strong knowledge of the spare-parts market in Oman and the region.",
        email: "m.aldawoodi@qsmtoman.com",
        phone: "0096879178056",
      },
    ];

  return (
    <section className="team" dir={isAr ? "rtl" : "ltr"}>
      <div className="site-container team__wrap">
        <hr className="team__rule" />
        <h2 className="team__heading"  id="staff">
          {t("team.heading", isAr ? "من هو من في قمة صور" : "Who is Who At QSMT")}
        
        </h2>

        <div className="team__grid">
          {members && members.length ? (
            members.map((m, i) => (
              <article
                className={`team__card ${i === 0 ? "team__card--featured" : ""}`}
                key={m.id || m.email || i}
              >
                <header className="team__cardHead">
                  <h3 className="team__name">{tr(m.name, lang)}</h3>
                  <div className="team__role">{tr(m.role, lang)}</div>
                </header>

                <p className="team__bio">{tr(m.bio, lang)}</p>

                <footer className="team__contact">
                  {m.email && (
                    <a
                      className="team__pill team__email"
                      href={`mailto:${m.email}`}
                      aria-label={t("team.email", "Email")}
                      dir="ltr"
                    >
                      <MailIcon />
                      <span>{m.email}</span>
                    </a>
                  )}
                  {m.phone && (
                    <a
                      className="team__pill team__phone"
                      href={`tel:${normalizeTelHref(m.phone)}`}
                      aria-label={t("team.call", "Call")}
                      dir="ltr"
                    >
                      <PhoneIcon />
                      <span>{m.phone}</span>
                    </a>
                  )}
                </footer>
              </article>
            ))
          ) : (
            <div className="team__empty">
              {t("team.empty", isAr ? "تفاصيل الفريق قريباً." : "Team details coming soon.")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
