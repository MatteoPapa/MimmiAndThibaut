import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import YesNoToggle from "./YesNoToggle";
import "../assets/toggle.css";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const withBase = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

/* ---------- IMMAGINI CAROSELLO (con BASE_URL) ---------- */
const galleryImages = [
  { src: withBase("/images/carousel/01.jpg"), alt: "Foto 1" },
  { src: withBase("/images/carousel/02.jpg"), alt: "Foto 2" },
  { src: withBase("/images/carousel/03.jpg"), alt: "Foto 3" },
  // { src: withBase("/images/carousel/04.jpg"), alt: "Foto 4" },
  { src: withBase("/images/carousel/05.jpg"), alt: "Foto 5" },
  { src: withBase("/images/carousel/06.jpg"), alt: "Foto 6" },
  { src: withBase("/images/carousel/07.jpg"), alt: "Foto 7" },
  { src: withBase("/images/carousel/08.jpg"), alt: "Foto 8" },
  { src: withBase("/images/carousel/09.jpg"), alt: "Foto 9" },
  { src: withBase("/images/carousel/10.jpg"), alt: "Foto 10" },
  { src: withBase("/images/carousel/11.jpg"), alt: "Foto 11" },
  { src: withBase("/images/carousel/12.jpg"), alt: "Foto 12" },
  { src: withBase("/images/carousel/13.jpg"), alt: "Foto 13" },
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
                alt={img.alt || `Slide ${idx + 1}`}
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

  return (
    <div className="flex flex-col text-center text-lg sm:text-xl text-[#41403E] items-center justify-center gap-2">
      <h2 className="text-2xl sm:text-3xl mb-3 text-center text-shadow-gray-500 text-shadow-sm">
        {t.gift.title}
      </h2>

      <p className="pb-5">{t.gift.intro}</p>

      <div className="flex flex-row items-center justify-center gap-4">
        <img
          src="images/pointing-sx.png"
          alt="pointing left"
          style={{ height: "30px" }}
        />
        <button
          className="button-drawn lined thin px-6 py-2 text-sm sm:text-xl"
          onClick={() => setActiveIban(true)}
        >
          {t.gift.button}
        </button>
        <img
          src="images/pointing-dx.png"
          alt="pointing right"
          style={{ height: "30px" }}
        />
      </div>

      {activeIban && (
        <div className="p-2 text-2xl border flex items-center justify-center flex-row gap-2 w-full md:w-1/2 rounded">
          <img src="images/piggy.png" alt="piggy bank" className="h-8 mr-2" />
          <p>{t.gift.iban}</p>
        </div>
      )}

      {/* --- Carosello responsive --- */}
      <div className="w-full max-w-6xl mt-8">
        {/* <h2 className="text-2xl sm:text-3xl mb-3 text-center text-shadow-gray-500 text-shadow-sm">{t.gift.galleryTitle}</h2> */}
        <Carousel images={galleryImages} />
      </div>
    </div>
  );
};

export default GiftRegistry;
