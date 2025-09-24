import React from "react";
import "./TeamWhoIsWho.css";
import { useI18n } from "../i18n/I18nProvider";

// If you have headshots, map them by id here
// import mubarak from "../assets/team/mubarak.jpg";
// const AVATAR = { mubarak };

const asArray = (x) => {
  if (Array.isArray(x)) return x;
  if (x && typeof x === "object") return Object.values(x); // handles accidental object shape
  return [];
};

export default function TeamWhoIsWho() {
  const { t } = useI18n();

  const heading = t("team.heading", "");
  const members = asArray(t("team.members", []));

  // Debug in the console so you can see what's coming from i18n
  if (process.env.NODE_ENV !== "production") {
    if (!heading) console.warn("[team] Missing key: team.heading");
    if (!members.length) console.warn("[team] No members found at team.members");
  }

  return (
    <section className="team" id="staff">
      <hr class="brands__rule"></hr>
      {heading && <h2 className="team__heading">{heading}</h2>}

      <div className="team__grid">
        {members.length ? (
          members.map((m) => (
            <article className="team__card" key={m.id || m.email}>
              {/* {AVATAR[m.id] ? <img className="team__avatar" src={AVATAR[m.id]} alt={m.name} /> : null} */}
              <header className="team__cardHead">
                <h3 className="team__name">{m.name}</h3>
                <div className="team__role">{m.role}</div>
              </header>
              <p className="team__bio">{m.bio}</p>
              <footer className="team__contact">
                <span className="team__email" dir="ltr">{m.email}</span>
                <span className="team__phone" dir="ltr">{m.phone}</span>
              </footer>
            </article>
          ))
        ) : (
          // Minimal placeholder so the section doesn't "disappear"
          <div className="team__empty">Team details coming soon.</div>
        )}
      </div>
      <hr class="brands__rule"></hr>
    </section>
  );
}
