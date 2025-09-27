import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import YesNoToggle from "./YesNoToggle";
import "../assets/toggle.css";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const withBase = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

/* ---------- YOUR BANK DETAILS ---------- */
const BANK = {
  holder: "MARTINA PAPA",
  iban: "FR76 2573 3000 0100 0001 3936 296",
  bic: "PSSSFR22",
};

/* ---------- Helpers ---------- */
function formatIban(iban) {
  return iban.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage(); // get translations

  const labels = t.gift.labels; // holder/iban/bic/copy/copied…

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className="text-xs sm:text-sm px-2 py-1 rounded border border-[#41403E]/30 hover:bg-[#41403E]/5 transition"
      aria-label={labels.copy}
      title={labels.copy}
    >
      {copied ? labels.copied : labels.copy}
    </button>
  );
}


/* ---------- IMMAGINI CAROSELLO (con BASE_URL) ---------- */
const galleryImages = [
  { src: withBase("/images/carousel/01.jpg"), alt: "" },
  { src: withBase("/images/carousel/02.jpg"), alt: "" },
  { src: withBase("/images/carousel/03.jpg"), alt: "" },
  { src: withBase("/images/carousel/05.jpg"), alt: "" },
  { src: withBase("/images/carousel/06.jpg"), alt: "" },
  { src: withBase("/images/carousel/07.jpg"), alt: "" },
  { src: withBase("/images/carousel/08.jpg"), alt: "" },
  { src: withBase("/images/carousel/09.jpg"), alt: "" },
  { src: withBase("/images/carousel/10.jpg"), alt: "" },
  { src: withBase("/images/carousel/11.jpg"), alt: "" },
  { src: withBase("/images/carousel/12.jpg"), alt: "" },
  { src: withBase("/images/carousel/13.jpg"), alt: "" },
];

function Arrow({ left, onClick, disabled }) {
  return (
    <button
      aria-label={left ? "Precedente" : "Successiva"}
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2 md:p-3 transition disabled:opacity-40 ${
        left ? "left-2 md:left-4" : "right-2 md:right-4"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={left ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

const Dots = ({ currentSlide, slideCount, moveToIdx }) => (
  <div className="flex items-center justify-center gap-2 mt-3">
    {Array.from({ length: slideCount }).map((_, idx) => (
      <button
        key={idx}
        aria-label={`Vai alla slide ${idx + 1}`}
        className={`h-2.5 w-2.5 rounded-full transition ${
          currentSlide === idx
            ? "bg-[#41403E]"
            : "bg-[#41403E]/30 hover:bg-[#41403E]/60"
        }`}
        onClick={() => moveToIdx(idx)}
      />
    ))}
  </div>
);

const Carousel = ({ images = galleryImages, auto = true, interval = 3500 }) => {
  const [current, setCurrent] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1, spacing: 12 },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 1.2, spacing: 16 } },
        "(min-width: 768px)": { slides: { perView: 2, spacing: 16 } },
        "(min-width: 1024px)": { slides: { perView: 3, spacing: 18 } },
      },
      created() {
        setCurrent(0);
      },
      slideChanged(s) {
        setCurrent(s.track.details.rel);
      },
    },
    [
      (slider) => {
        if (!auto) return;
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => slider.next(), interval);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const len = images.length;

  return (
    <div className="relative w-full">
      <div ref={sliderRef} className="keen-slider">
        {images.map((img, idx) => (
          <div key={idx} className="keen-slider__slide">
            <figure className="overflow-hidden rounded-2xl shadow-sm bg-white">
              <img
                src={img.src}
                alt={img.alt || ""}
                className="h-60 sm:h-72 md:h-80 lg:h-64 w-full object-cover"
                loading={idx > 1 ? "lazy" : "eager"}
              />
            </figure>
          </div>
        ))}
      </div>

      <Arrow left onClick={() => instanceRef.current?.prev()} />
      <Arrow onClick={() => instanceRef.current?.next()} />

      <Dots
        currentSlide={current % len}
        slideCount={len}
        moveToIdx={(i) => instanceRef.current?.moveToIdx(i)}
      />
    </div>
  );
};

const GiftRegistry = () => {
  const [activeIban, setActiveIban] = useState(false);
  const { t } = useLanguage();

  // Translation fallbacks for labels if not present in t.gift
  const labels = {
    showBtn: t?.gift?.button ?? "Show bank details",
    title: t?.gift?.title ?? "Wedding Gift",
    intro:
      t?.gift?.intro ??
      "If you'd like to contribute with a gift, here are the bank details.",
    holder: t?.gift?.labels.holder ?? "Account holder",
    iban: t?.gift?.labels.iban ?? "IBAN",
    bic: t?.gift?.labels.bic ?? "BIC / SWIFT",
  };

  return (
    <div className="flex flex-col text-center text-lg sm:text-xl text-[#41403E] items-center justify-center gap-2">
      <h2 className="text-2xl sm:text-3xl mb-3 text-center text-shadow-gray-500 text-shadow-sm">
        {labels.title}
      </h2>

      <p className="pb-5">{labels.intro}</p>

      <div className="flex flex-row items-center justify-center gap-4">
        <img
          src={withBase("/images/pointing-sx.png")}
          alt="pointing left"
          style={{ height: "30px" }}
        />
        <button
          className="button-drawn lined thin px-6 py-2 text-sm sm:text-xl"
          onClick={() => setActiveIban(true)}
        >
          {labels.showBtn}
        </button>
        <img
          src={withBase("/images/pointing-dx.png")}
          alt="pointing right"
          style={{ height: "30px" }}
        />
      </div>

      {activeIban && (
        <div className="p-5 sm:p-4 text-left text-base sm:text-lg border flex flex-col gap-3 w-full rounded-2xl bg-white/50 shadow-sm m-4">
          <div className="flex justify-center items-center gap-2">
            <img
              src={withBase("/images/piggy.png")}
              alt="piggy bank"
              className="h-12"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
            <span className="opacity-70">{labels.holder}</span>
            <span className="font-mono font-medium truncate">{BANK.holder}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
            <span className="opacity-70">{labels.iban}</span>
            <span className="font-mono text-base sm:text-lg tracking-wide">
              {formatIban(BANK.iban)}
            </span>
            <CopyButton value={BANK.iban.replace(/\s+/g, "")} label="IBAN" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
            <span className="opacity-70">{labels.bic}</span>
            <span className="font-mono">{BANK.bic}</span>
            <CopyButton value={BANK.bic} label="BIC" />
          </div>
        </div>
      )}

      {/* --- Carosello responsive --- */}
      <div className="w-full max-w-6xl mt-8">
        <Carousel images={galleryImages} />
      </div>
    </div>
  );
};

export default GiftRegistry;
