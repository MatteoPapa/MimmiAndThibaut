import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import YesNoToggle from "./YesNoToggle";
import "../assets/toggle.css";

const withBase = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

const Confirmation = () => {
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => setSelectedOption(e.target.value?.toLowerCase?.() || "");
  const isYes = (val) => ["yes", "si", "sì", "oui"].includes(val);
  const isNo  = (val) => ["no", "non"].includes(val);

  return (
    <div className="text-center text-lg sm:text-xl text-[#41403E]">
      <h2 className="text-2xl sm:text-3xl mb-3 text-center text-shadow-gray-500 text-shadow-sm">
        {t.rsvp.pageTitle}
      </h2>

      {/* <p className="mb-6">
        {t.rsvp.deadlinePrefix}{" "}
        <span className="shadow-gray-900 text-shadow-md">{t.rsvp.deadlineDate}</span>.
      </p> */}

      <YesNoToggle name="rsvp" onChange={handleChange} />

      {isYes(selectedOption) && (
        <div className="justify-center items-center flex flex-col">
          <p className="pb-6">{t.rsvp.yesIntro}</p>

          <div className="flex w-56 justify-center items-center">
            <a
              href="https://forms.gle/XymRYRtVS3GQQ3KC9"
              target="_blank"
              rel="noopener noreferrer"
              className="button-drawn lined thin text-black hover:text-black flex items-center gap-3"
            >
              <img
                src={withBase("images/link.png")}
                alt="Google Form"
                className="h-10 w-10"
              />
              <span className="text-3xl font-medium">{t.rsvp.formButton}</span>
            </a>
          </div>
        </div>
      )}

      {isNo(selectedOption) && (
        <div>
          <p className="mt-4">{t.rsvp.noMessage}</p>
          <img
            src={withBase("images/crying_transparent.png")}
            alt="Sad emoji"
            className="w-100 mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Confirmation;
