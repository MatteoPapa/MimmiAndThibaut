import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import Layout from "../components/Layout.jsx";
import Countdown from "../components/Countdown.jsx";

const STORAGE_KEY = "about_active_tab"; // same key as About.jsx

const Home = () => {
    const { t, lang } = useLanguage();

    const resetAboutTab = () => {
        try {
            localStorage.setItem(STORAGE_KEY, "information");
        } catch {
            return
        }
    };

    // Optional simple labels per language
    const countdownLabels =
        {
            en: {
                days: "Days",
                hours: "Hours",
                minutes: "Minutes",
                seconds: "Seconds",
                done: "It's today! 🎉",
            },
            it: {
                days: "Giorni",
                hours: "Ore",
                minutes: "Minuti",
                seconds: "Secondi",
                done: "È oggi! 🎉",
            },
            fr: {
                days: "Jours",
                hours: "Heures",
                minutes: "Minutes",
                seconds: "Secondes",
                done: "C’est aujourd’hui ! 🎉",
            },
        }[lang] || undefined;

    return (
        <Layout>
            <div className="relative flex flex-col min-h-screen items-center px-4 py-12 pb-30 lg:pb-0">
                <img
                    src="images/cornice-sopra_transparent_mod.png"
                    alt="Decorazione"
                    className="absolute top-0 left-3 w-70 md:w-90 opacity-90 pointer-events-none select-none "
                    style={{ zIndex: -10 }}
                />

                {/* For small screens: straight version, centered */}
                <img
                    src="images/cornice-sotto_straight.png"
                    alt="Decorazione"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-90 opacity-90 pointer-events-none select-none block md:hidden mb-8"
                    style={{ zIndex: -10 }}
                />

                {/* For medium and up: original bottom-right version */}
                <img
                    src="images/cornice-sotto_transparent.png"
                    alt="Decorazione"
                    className="absolute bottom-0 right-3 w-50 md:w-70 opacity-90 pointer-events-none select-none hidden md:block"
                    style={{ zIndex: -10 }}
                />

                <div className="relative flex flex-col items-center justify-center text-center p-10 pt-30 lg:pt-10">
                    <img
                        // src="images/sposini.jpg"
                        src="images/sposini-nobg.png"
                        alt="Sposini"
                        className="w-full max-w-xs mb-4"
                    />

                    <h1
                        className="mb-1 parisienne-regular text-center"
                        style={{
                            fontSize: "4rem",
                            lineHeight: "1.2",
                            fontWeight: "normal",
                        }}
                    >
                        Martina & Thibaut
                    </h1>

                    <p className="text-3xl sm:text-4xl text-center">
                        {t.subtitle}
                    </p>

                    <div className="flex flex-row mt-4">
                        <img
                            src="images/cuoricino_nero.png"
                            alt="Cuoricino"
                            style={{
                                height: "60px",
                            }}
                        />
                    </div>

                    <p className="text-3xl text-center text-gray-600 mt-4 mb-6 flex items-center gap-2">
                        <img
                            src="images/calendar.png"
                            alt="Calendar"
                            className="h-[30px]"
                        />
                        <span>{t.date}</span>
                        <img
                            src="images/place.png"
                            alt="Place"
                            className="h-[30px] ml-6"
                        />
                        <span>{t.place}</span>
                    </p>

                    <Countdown
                        targetISO="2026-06-20T00:00:00+02:00"
                        labels={countdownLabels}
                    />

                    <div className="flex flex-row items-center justify-center gap-4 mt-8">
                        <img
                            src="images/pointing-sx.png"
                            alt="pointing"
                            style={{
                                height: "30px",
                            }}
                        />
                        <Link to="/about" onClick={resetAboutTab}>
                            <button className="button-drawn lined thin px-6 py-2 text-lg sm:text-2xl">
                                {t.button}
                            </button>
                        </Link>
                        <img
                            src="images/pointing-dx.png"
                            alt="pointing"
                            style={{
                                height: "30px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
