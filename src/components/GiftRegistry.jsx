import { useState } from "react";

const GiftRegistry = () => {
  const [activeIban, setActiveIban] = useState(false);

  return (
    <div className="flex flex-col text-center text-lg sm:text-xl text-[#41403E] items-center justify-center gap-2">
      <h2 className="text-2xl sm:text-3xl mb-3 text-center text-shadow-gray-500 text-shadow-sm">
        Lista Nozze
      </h2>
      <p className="pb-5">
        I soldi non fanno la felicità, ma il viaggio di nozze sì :)
      </p>

      <div className="flex flex-row items-center justify-center gap-4">
        <img
          src="images/pointing-sx.png"
          alt="pointing"
          style={{
            height: "30px",
          }}
        />
        <button
          className="button-drawn lined thin px-6 py-2 text-sm sm:text-xl"
          onClick={() => setActiveIban(true)}
          
        >
          {/* PIU PICCOLO */}
          Voglio gli sposi felici!
        </button>
        <img
          src="images/pointing-dx.png"
          alt="pointing"
          style={{
            height: "30px",
          }}
        />
      </div>

      {activeIban && (
        <div className="p-2 text-2xl rounder border flex items-center justify-center flex-row gap-2 w-full md:w-1/2 rounded">
          <img src="images/piggy.png" alt="ilpiggy" className="h-8 mr-2"/>
          <p>FR7617515900000445403710802</p>
        </div>
      )}

      
    </div>
  );
};

export default GiftRegistry;
