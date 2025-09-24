import React, { useState } from "react";
import "./ContactSection.css";
import { useI18n } from "../i18n/I18nProvider";
import mechanic from "../assets/hero-mechanic.jpg";

export default function ContactSection() {
  <hr class="brands__rule"></hr>
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setStatus({ state: "success", msg: t("contact.sent") });
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus({ state: "error", msg: t("contact.err_generic") });
    }
  };

  return (
    <section
      className="contactHero"
      style={{ backgroundImage: `url(${mechanic})` }}
      aria-label={t("contact.heading")}
      id="contact"
    >
      <div className="contactHero__scrim" />
      <div className="contactHero__content">
        <div className="contactHero__card">
          <h2 className="contact__title" style={{ whiteSpace: "pre-line" }}>
            {t("contact.heading")}
          </h2>
          <form className="contact__form" onSubmit={onSubmit} noValidate>
            <input className="contact__input" type="text" name="name" placeholder={t("contact.name")} value={form.name} onChange={onChange} />
            <input className="contact__input" type="tel" name="phone" placeholder={t("contact.phone")} value={form.phone} onChange={onChange} />
            <input className="contact__input" type="email" name="email" placeholder={t("contact.email")} value={form.email} onChange={onChange} />
            <textarea className="contact__textarea" name="message" placeholder={t("contact.message")} rows={5} value={form.message} onChange={onChange} />
            <button className="contact__btn" type="submit" disabled={status.state === "loading"}>
              {status.state === "loading" ? t("contact.sending") : t("contact.send")}
            </button>
            {status.state === "error" && (<p className="contact__alert contact__alert--error">{status.msg}</p>)}
            {status.state === "success" && (<p className="contact__alert contact__alert--success">{status.msg}</p>)}
          </form>
        </div>
      </div>
    </section>
  );
}
