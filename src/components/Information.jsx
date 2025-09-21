// Information.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import Timeline from "./Timeline";
import { Link } from "react-router-dom";

const withBase = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

const Information = ({ setActiveTab }) => {
  const { t } = useLanguage();

  // Ensure event images get the correct base (works in dev and on GH Pages)
  const timelineEvents = t.info.timeline.map((e) => ({
    ...e,
    image: e.image?.startsWith("http") ? e.image : withBase(e.image || ""),
  }));

  return (
    <div className="text-[#41403E] px-4 w-full flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl mb-3 text-center text-shadow-gray-500 text-shadow-sm">
        {t.info.title}
      </h2>

      <Timeline events={timelineEvents} />

      <div className="w-full flex flex-col justify-center items-center gap-6 border border-dashed rounded-2xl py-8 px-4 shadow-xl mt-6 bg-transparent">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-2 text-center text-gray-800 drop-shadow">
          <span className="inline-flex items-center gap-2">
            <img
              src={withBase("images/indicazioni.png")}
              alt="indicazioni"
              className="h-8 mr-2"
            />
            <span>{t.info.directionsTitle}</span>
          </span>
        </h2>

        <div className="flex flex-col gap-8 w-full max-w-md text-center">
          <div>
            <a
              href={t.info.churchLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
            >
              📍 {t.info.churchName}
            </a>
            <p>{t.info.churchAddress}</p>
          </div>

          <div>
            <a
              href={t.info.venueLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
            >
              📍 {t.info.venueName}
            </a>
            <p>{t.info.venueAddress}</p>
          </div>

          <div>
            <a
              href={t.info.allStopsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
            >
              🚐 {t.info.allStops}
            </a>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center gap-4 px-0 py-10 my-20 relative">
        <h2 className="text-2xl">{t.rsvp.question}</h2>
        <Link to="/about">
          <button
            className="button-drawn lined thin px-6 py-2 text-lg sm:text-2xl"
            onClick={() => setActiveTab("confirmation")}
          >
            {t.rsvp.cta}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Information;
