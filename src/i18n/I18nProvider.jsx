import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STRINGS } from "./strings";

const I18nCtx = createContext(null);

export function I18nProvider({ children }) {
  const initial = (localStorage.getItem("lang") || "").toLowerCase().startsWith("ar")
    ? "ar" : (localStorage.getItem("lang") || (navigator.language || "en")).startsWith("ar") ? "ar" : "en";
  const [lang, setLang] = useState(initial);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");
  }, [lang]);

  const dict = STRINGS[lang];

  const t = useMemo(() => {
    const get = (path, fallback = "") => {
      const parts = path.split(".");
      let cur = dict;
      for (const p of parts) cur = cur?.[p];
      return cur ?? fallback;
    };
    return get;
  }, [dict]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}




