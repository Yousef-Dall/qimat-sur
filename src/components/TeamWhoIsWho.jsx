// src/components/TeamWhoIsWho.jsx
import React from "react";
import "./TeamWhoIsWho.css";
import { useI18n } from "../i18n/I18nProvider";

/* helpers */
const normalizeTelHref = (raw) => {
  if (!raw) return "";
  let s = String(raw).trim().replace(/\s+/g, "").replace(/-/g, "");
  if (s.startsWith("00")) s = "+" + s.slice(2);
  if (!s.startsWith("+")) s = "+" + s;
  return s;
};
// supports either a plain string or an object like { en, ar }
const tr = (val, lang) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val[lang] ?? val.en ?? val.ar ?? Object.values(val)[0] ?? "";
};

/* tiny inline icons */
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

export default function WhoIsWho({ members: overrideMembers }) {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  // Prefer i18n data (keeps EN/AR in sync). Allow prop override for flexibility.
  const fromI18n = t("team.members");
  const members = (Array.isArray(overrideMembers) && overrideMembers.length
    ? overrideMembers
    : Array.isArray(fromI18n) && fromI18n.length
    ? fromI18n
    : []);

  return (
    <section className="team" dir={isAr ? "rtl" : "ltr"}>
      <div className="site-container team__wrap">
        <hr className="team__rule" />
        <h2 className="team__heading" id="staff">
          {t("team.heading", isAr ? "الهيكل الإداري في QSMT" : "Who is Who At QSMT")}
        </h2>

        <div className="team__grid">
          {members.length ? (
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
                      aria-label={t("team.email", isAr ? "البريد" : "Email")}
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
                      aria-label={t("team.call", isAr ? "اتصال" : "Call")}
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
