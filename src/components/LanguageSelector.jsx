// src/components/LanguageSelector.jsx
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import ReactCountryFlag from "react-country-flag";

const FLAGS = {
  it: "IT",
  fr: "FR",
  en: "GB",
};

const LanguageSelector = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-8 right-4 z-50" ref={ref}>
      <div className="relative">
        {/* Current language flag */}
        <button
          onClick={() => setOpen(!open)}
          className="text-4xl px-3 py-1 cursor-pointer"
        >
          <ReactCountryFlag
            countryCode={FLAGS[lang]}
            svg
            style={{ width: "1em", height: "1em" }}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 bg-white/90 backdrop-blur-md rounded-md shadow-lg flex flex-col">
            {Object.entries(FLAGS).map(([code, cc]) =>
              code !== lang ? (
                <button
                  key={code}
                  onClick={() => {
                    setLang(code);
                    setOpen(false);
                  }}
                  className="px-3 py-1 hover:bg-gray-100 transition"
                >
                  <ReactCountryFlag
                    countryCode={cc}
                    svg
                    style={{ width: "2em", height: "2em" }}
                  />
                </button>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
