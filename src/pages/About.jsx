// About.jsx
import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout.jsx";
import Information from "../components/Information.jsx";
import Confirmation from "../components/Confirmation.jsx";
import GiftRegistry from "../components/GiftRegistry.jsx";
import AboutNavbar from "../components/AboutNavbar.jsx";
import { useLanguage } from "../context/LanguageContext"; // ← add
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "about_active_tab";
const VALID_TABS = ["information", "confirmation", "gift"];

const About = () => {
  const { t } = useLanguage(); // ← get translations
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return VALID_TABS.includes(saved) ? saved : "information";
    } catch {
      return "information";
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Localized labels (fallback to Italian keys if you prefer)
  const tabs = [
    { key: "home",         label: "Home",                     icon: "images/home.png" },
    { key: "information",  label: t.info.title,               icon: "images/information.png" },
    { key: "confirmation", label: t.rsvp?.title || "Conferma",  icon: "images/confirmation.png" },
    { key: "gift",         label: t.gift?.title || "Lista Nozze", icon: "images/present.png" },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "information":
        return <Information setActiveTab={setActiveTab} />;
      case "confirmation":
        return <Confirmation />;
      case "gift":
        return <GiftRegistry />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (VALID_TABS.includes(activeTab)) {
      try {
        localStorage.setItem(STORAGE_KEY, activeTab);
      } catch {
        return
      }
    }
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 py-8 w-full relative">
        <AboutNavbar
          tabs={tabs.filter((tab) => tab.key !== "home")}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Mobile menu (unchanged, now with localized labels) */}
        <div className="lg:hidden w-full mb-6 flex justify-start relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lined thin px-4 py-2 text-4xl"
          >
            ☰
          </button>

          {menuOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-56">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (tab.key === "home") navigate("/");
                    else {
                      setActiveTab(tab.key);
                      setMenuOpen(false);
                    }
                  }}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-lg transition ${
                    activeTab === tab.key ? "bg-gray-100" : ""
                  }`}
                >
                  <img src={tab.icon} alt={tab.label} className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl lg:pt-20">{renderTab()}</div>
      </div>
    </Layout>
  );
};

export default About;
