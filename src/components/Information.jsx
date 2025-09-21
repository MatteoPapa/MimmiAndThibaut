// Information.jsx
import Timeline from "./Timeline";

const timelineEvents = [
  {
    time: "15:30",
    image: "/images/church-time.png",
    title: "Cerimonia",
    description:
      "La cerimonia si terrà nella Basilica di Santa Sabina all’Aventino, una delle più antiche chiese di Roma, immersa nella quiete del colle Aventino.",
  },
  {
    time: "18:00",
    image: "/images/cincin.png",
    title: "Aperitivo",
    description:
      "Ci sposteremo a Casal Montani, dove vi aspetta un aperitivo all'aperto tra ulivi e musica dal vivo. Un momento per rilassarsi, brindare e iniziare i festeggiamenti.",
  },
  {
    time: "20:00",
    image: "/images/dinner-time-nobg.png",
    title: "Cena",
    description:
      "Una cena sotto le stelle con piatti selezionati, risate e condivisione. Accomodatevi e godetevi l’atmosfera conviviale tra natura e luci soffuse.",
  },
  {
    time: "23:00",
    image: "/images/party2.png",
    title: "Party!",
    description:
      "La serata continua con musica, balli e tante sorprese. Preparatevi a divertirvi: la pista vi aspetta fino a tardi!",
  },
  {
    // time: "02:30",
    time: "t.b.d.",
    image: "/images/theend.png",
    title: "Fine della festa",
    description:
      "La serata si conclude con un ultimo brindisi e tanti ricordi da portare a casa. Grazie per aver festeggiato con noi!",
  },
];

const Information = (setActiveTab) => (
  <div className="text-[#41403E] px-4 w-full flex flex-col items-center">
    <h2 className="text-2xl sm:text-3xl mb-3 text-center text-shadow-gray-500 text-shadow-sm">
      Informazioni
    </h2>

    <Timeline events={timelineEvents} />

    <div className="w-full flex flex-col justify-center items-center gap-6 border border-dashed rounded-2xl py-8 px-4 shadow-xl mt-6 bg-transparent">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2 text-center text-gray-800 drop-shadow">
        <span className="inline-flex items-center gap-2">
          <img
            src="/images/indicazioni.png"
            alt="indicazioni"
            className="h-8 mr-2"
          />
          <span>Indicazioni Stradali</span>
        </span>
      </h2>

      <div className="flex flex-col gap-8 w-full max-w-md text-center">
        <div>
          <a
            href="https://share.google/zwZg88d5vk4DOXLaE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg sm:text-xl font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
          >
            📍 Basilica di Santa Sabina all’Aventino
          </a>
          <p>Piazza Pietro D'Illiria, 1, 00153 Roma RM</p>
        </div>

        <div>
          <a
            href="https://share.google/f1YfYuw86SMhuDAJ1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg sm:text-xl font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
          >
            📍 Casal Montani
          </a>
          <p>Via di Casal Montani, 00132 Roma RM</p>
        </div>
        <div>
          <a
            href="https://www.google.com/maps/d/edit?mid=1S8vcsbsXOg4wpUXTRCHgAMhc54bTyts&usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg sm:text-xl font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
          >
            🚐 Tutte le tappe
          </a>
        </div>
      </div>
    </div>

    <div className="flex w-full lg:w-1/2 flex-col justify-center items-center gap-4 px-0 py-10 my-20 relative">
      {/* <img
        src="images/cornice-sopra2.png"
        alt="Decorazione"
        className="absolute -top-5 -left-7 w-40 opacity-90 pointer-events-none select-none "
        style={{ zIndex: -10 }}
      />

      <img
        src="images/cornice-sotto_transparent.png"
        alt="Decorazione"
        className="absolute -bottom-7 -right-10 w-40 opacity-90 pointer-events-none select-none "
        style={{ zIndex: -10 }}
      /> */}
      <h2 className="text-2xl">Sei dei nostri ?</h2>
      <a href="/about">
        <button
          className="button-drawn lined thin px-6 py-2 text-lg sm:text-2xl"
          onClick={() => setActiveTab("confirmation")}
        >
          Confermacelo !
        </button>
      </a>
    </div>
  </div>
);

export default Information;
