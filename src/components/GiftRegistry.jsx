import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const GiftRegistry = () => {
  const [activeIban, setActiveIban] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex flex-col text-center text-lg sm:text-xl text-[#41403E] items-center justify-center gap-2">
      <h2 className="text-2xl sm:text-3xl mb-3 text-center text-shadow-gray-500 text-shadow-sm">
        {t.gift.title}
      </h2>

      <p className="pb-5">{t.gift.intro}</p>

      <div className="flex flex-row items-center justify-center gap-4">
        <img src="images/pointing-sx.png" alt="pointing left" style={{ height: "30px" }} />
        <button
          className="button-drawn lined thin px-6 py-2 text-sm sm:text-xl"
          onClick={() => setActiveIban(true)}
        >
          {t.gift.button}
        </button>
        <img src="images/pointing-dx.png" alt="pointing right" style={{ height: "30px" }} />
      </div>

      {activeIban && (
        <div className="p-2 text-2xl border flex items-center justify-center flex-row gap-2 w-full md:w-1/2 rounded">
          <img src="images/piggy.png" alt="piggy bank" className="h-8 mr-2" />
          <p>{t.gift.iban}</p>
        </div>
      )}
    </div>
  );
};

export default GiftRegistry;
