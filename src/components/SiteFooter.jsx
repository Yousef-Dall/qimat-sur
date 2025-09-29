import React from "react";
import "./SiteFooter.css";
import logo from "../assets/logo.png";
import { useI18n } from "../i18n/I18nProvider";


const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 256 256" width="20" height="20" {...p}>
    <path fill="currentColor" d="M128 24a104 104 0 0 0-89.53 156.78L24 232l51.76-14.15A104 104 0 1 0 128 24Zm0 192a88 88 0 0 1-44.86-12.35l-6.4-3.82-30 8.2 8.32-28.77-4.13-6.78A88 88 0 1 1 128 216Zm45.13-57.62c-2.48-1.24-14.7-7.21-17-8s-3.93-1.24-5.6 1.24-6.41 8-7.86 9.74-2.9 1.86-5.38.62a72.38 72.38 0 0 1-21.27-13.14 79.67 79.67 0 0 1-14.76-18.29c-1.53-2.62-.16-4 1.08-5.22s2.48-3.1 3.72-4.65a17.54 17.54 0 0 0 2.48-4.14 4.88 4.88 0 0 0-.23-4.65c-.62-1.24-5.6-13.46-7.66-18.49s-4.13-4.26-5.6-4.26-3.1-.16-4.78-.16a9.19 9.19 0 0 0-6.71 3.1c-2.3 2.48-8.8 8.58-8.8 20.94s9 24.31 10.18 26a114.37 114.37 0 0 0 30.3 31.2c21.08 14.38 25.33 11.4 29.9 10.78s14.7-5.67 16.78-11.18a20.24 20.24 0 0 0 1.39-11.18c-.46-1.16-2.07-1.86-4.55-3.1Z"/>
  </svg>
);
const InstagramIcon = (p) => (
  <svg viewBox="0 0 256 256" width="20" height="20" {...p}>
    <path fill="currentColor" d="M176 24H80a56.06 56.06 0 0 0-56 56v96a56.06 56.06 0 0 0 56 56h96a56.06 56.06 0 0 0 56-56V80a56.06 56.06 0 0 0-56-56Zm40 152a40 40 0 0 1-40 40H80a40 40 0 0 1-40-40V80a40 40 0 0 1 40-40h96a40 40 0 0 1 40 40Zm-28-92a12 12 0 1 1-12-12a12 12 0 0 1 12 12ZM128 76a52 52 0 1 0 52 52a52.06 52.06 0 0 0-52-52Zm0 88a36 36 0 1 1 36-36a36 36 0 0 1-36 36Z"/>
  </svg>
);
const XIcon = (p) => (
  <svg viewBox="0 0 256 256" width="20" height="20" {...p}>
    <path fill="currentColor" d="M188.74 32h35.7l-78.06 89.2L232 224h-65.5l-51.28-60.24L56.1 224H20.4l83.16-94.95L24 32h66.4l46.53 54.77Zm-12.4 175.36h19.77L80.14 46.08H60Z"/>
  </svg>
);
const FacebookIcon = (p) => (
  <svg viewBox="0 0 256 256" width="20" height="20" {...p}>
    <path fill="currentColor" d="M232 128a104 104 0 1 0-120 102.27V160H88v-32h24v-20c0-23.71 14.12-36.73 35.73-36.73a145.58 145.58 0 0 1 21.21 1.85v24h-11.94c-11.77 0-15.4 7.3-15.4 14.79V128h26.23l-4.19 32h-22v70.27A104.12 104.12 0 0 0 232 128Z"/>
  </svg>
);
const PhoneIcon = (p) => (
  <svg viewBox="0 0 256 256" width="20" height="20" {...p}>
    <path fill="currentColor" d="M223.88 158.85l-49.6-21.26a16 16 0 0 0-16.55 3.1l-22.49 19.61a123.35 123.35 0 0 1-40.38-40.38l19.61-22.49a16 16 0 0 0 3.1-16.55l-21.26-49.6A16 16 0 0 0 41.1 24H32A16 16 0 0 0 16 40a200 200 0 0 0 200 200a16 16 0 0 0 16-16v-9.09a16 16 0 0 0-8.12-14.06Z"/>
  </svg>
);

export default function SiteFooter() {
  const { t, lang } = useI18n();


  const whatsapp  = "96893689729";
  const instagram = { handle: "qsmt_oman", url: "https://instagram.com/qsmt_oman" };
  const twitter   = { handle: "qsmt_oman", url: "https://twitter.com/qsmt_oman" };
  const facebook  = { name: "Qimat Sur Modern Trading", url: "https://facebook.com/" };
  const phones    = ["+968 92405017", "+968 91394776", "+968 93689729"];

  
  const waText = t(
    "footer.whatsapp_prefill",
    lang === "ar" ? "مرحبًا QSMT، أود الحجز/الاستفسار." : "Hello QSMT, I’d like to book / ask a question."
  );
  const waHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(waText)}`;

  
  return (
    <footer className="footer" key={lang} data-lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="footer__wrap">
      
        <div className="footer__left">
          <img src={logo} alt="QSMT" className="footer__logo" />
          <div className="footer__title">
            {t("footer.contact", lang === "ar" ? "تواصل معنا" : "Contact Us")}
          </div>
        </div>

    
        <nav className="footer__center" aria-label={t("footer.social_aria", "Social links")}>
          <div className="footer__stack" aria-label={t("footer.phones_aria", "Phone numbers")}>
            {phones.map((p) => (
              <a key={p} className="footer__iconLink" href={`tel:${p.replace(/\s+/g, "")}`} aria-label={p}>
                <PhoneIcon className="footer__icon" />
                <span className="footer__label">{p}</span>
              </a>
            ))}
          </div>

          <a className="footer__iconLink" href={waHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon className="footer__icon" />
            <span className="footer__label">+{whatsapp}</span>
          </a>

          
          <a className="footer__iconLink" href={instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon className="footer__icon" />
            <span className="footer__label">@{instagram.handle}</span>
          </a>

          <a className="footer__iconLink" href={twitter.url} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
            <XIcon className="footer__icon" />
            <span className="footer__label">@{twitter.handle}</span>
          </a>

          <a className="footer__iconLink" href={facebook.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FacebookIcon className="footer__icon" />
            <span className="footer__label">{facebook.name}</span>
          </a>
        </nav>

       
        <div className="footer__right">
          <a className="footer__button" href={waHref} target="_blank" rel="noopener noreferrer">
            {t("footer.book_now", lang === "ar" ? "احجز الآن" : "Book Now")}
          </a>
        </div>
      </div>
    </footer>
  );
}
