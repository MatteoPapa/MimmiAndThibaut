import React, { useState } from "react";
import YesNoToggle from "./YesNoToggle";
import "../assets/toggle.css";

const Confirmation = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const name = "rsvp"; // Name for the radio inputs

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="text-center text-lg sm:text-xl text-[#41403E]">
      <h2 className="text-2xl sm:text-3xl mb-3 text-center text-shadow-gray-500 text-shadow-sm">
        Conferma la tua presenza
      </h2>
      <p className="mb-6">
        Facci sapere se parteciperai entro il <span className="shadow-gray-900 text-shadow-md">20 gennaio 2026</span>.
      </p>

      <YesNoToggle name="rsvp" onChange={handleChange} />

      {selectedOption === "si" && (
        <div className="justify-center items-center flex flex-col">
          <p className="pb-6">
            Yeee ! Compila il form
            sottostante per darci più dettagli.
          </p>
          <div className="flex w-56 justify-center items-center">
          <a
            href="https://forms.gle/XymRYRtVS3GQQ3KC9"
            target="_blank"
            rel="noopener noreferrer"
            className="button-drawn lined thin text-black hover:text-black flex items-center gap-3"
          >
            <img
              src="/images/link.png"
              alt="Icona Google Form"
              className="h-10 w-10"
            />
            <span className="text-3xl font-medium">Form</span>
          </a>
          </div>
        </div>
      )}

      {selectedOption == "no" && (
        <div>
          <p className="mt-4">Ci dispiace che non potrai essere dei nostri.</p>
          <img
            src="/images/crying_transparent.png"
            alt="Siamo spiacenti"
            className="w-100 mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Confirmation;
