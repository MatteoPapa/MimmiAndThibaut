import React, { createContext, useState, useContext, useEffect } from "react";
import it from "../lang/it";
import fr from "../lang/fr";
import en from "../lang/en";

const translations = { it, fr, en };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState("it");

  // Read language from cookie on mount
  useEffect(() => {
    const cookieLang = document.cookie
      .split("; ")
      .find(row => row.startsWith("lang="))
      ?.split("=")[1];
    if (cookieLang && translations[cookieLang]) {
      setLangState(cookieLang);
    }
  }, []);

  // Function to set both state and cookie
  const setLang = (code) => {
    setLangState(code);
    document.cookie = `lang=${code}; path=/; max-age=31536000`; // 1 year
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
