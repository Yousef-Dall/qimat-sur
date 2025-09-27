import React, { useState } from "react";
import "./ContactSection.css";
import { useI18n } from "../i18n/I18nProvider";
import mechanic from "../assets/hero-mechanic.jpg";

export default function ContactSection() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    website: "", // honeypot field (must stay empty)
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return t("contact.name");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return t("contact.email");
    if (!form.message.trim()) return t("contact.message");
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ state: "error", msg: err });

    try {
      setStatus({ state: "loading", msg: t("contact.sending") });

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          website: form.website, // honeypot
          lang,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed");

      setStatus({ state: "success", msg: t("contact.sent") });
      setForm({ name: "", phone: "", email: "", message: "", website: "" });
    } catch {
      setStatus({ state: "error", msg: t("contact.err_generic") });
    }
  };

  return (
    <>
      <hr className="as__rule" />

      <section
        id="contact"
        className="contactHero"
        dir={isAr ? "rtl" : "ltr"}
        aria-label={t("contact.heading")}
        style={{ backgroundImage: `url(${mechanic})` }}
      >
        <div className="contactHero__scrim" />
        <div className="contactHero__content">
          <div className="contactHero__card">
            <h2 className="contact__title" style={{ whiteSpace: "pre-line" }}>
              {t("contact.heading")}
            </h2>

            <form className="contact__form" onSubmit={onSubmit} noValidate>
              {/* Honeypot (bots fill it, humans never see it) */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                }}
              />

              <input
                className="contact__input"
                type="text"
                name="name"
                placeholder={t("contact.name")}
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                required
              />

              <input
                className="contact__input"
                type="tel"
                name="phone"
                placeholder={t("contact.phone")}
                value={form.phone}
                onChange={onChange}
                autoComplete="tel"
              />

              <input
                className="contact__input"
                type="email"
                name="email"
                placeholder={t("contact.email")}
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                required
              />

              <textarea
                className="contact__textarea"
                name="message"
                placeholder={t("contact.message")}
                rows={5}
                value={form.message}
                onChange={onChange}
                required
              />

              <button
                className="contact__btn"
                type="submit"
                disabled={status.state === "loading"}
              >
                {status.state === "loading"
                  ? t("contact.sending")
                  : t("contact.send")}
              </button>

              <div aria-live="polite">
                {status.state === "error" && (
                  <p className="contact__alert contact__alert--error">
                    {status.msg}
                  </p>
                )}
                {status.state === "success" && (
                  <p className="contact__alert contact__alert--success">
                    {status.msg}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
