import React from "react";

const pad = (n) => String(n).padStart(2, "0");

const diffParts = (targetDate) => {
  const now = new Date();
  const diffMs = targetDate - now;
  if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, done: false };
};

const Countdown = ({ targetISO = "2026-06-20T00:00:00+02:00", labels }) => {
  const [parts, setParts] = React.useState(() => diffParts(new Date(targetISO)));

  React.useEffect(() => {
    const target = new Date(targetISO);
    const id = setInterval(() => setParts(diffParts(target)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  const l = {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    done: "It's today! 🎉",
    ...(labels || {}),
  };

  if (parts.done) {
    return (
      <div className="mt-4 text-2xl sm:text-3xl text-center text-gray-700">
        {l.done}
      </div>
    );
  }

  return (
    <div className="mt-4 flex gap-4 sm:gap-6 items-center justify-center">
      <div className="text-center">
        <div className="text-4xl sm:text-5xl font-semibold">{pad(parts.days)}</div>
        <div className="text-sm uppercase tracking-wide text-gray-600">{l.days}</div>
      </div>
      <div className="text-4xl sm:text-5xl font-semibold">:</div>
      <div className="text-center">
        <div className="text-4xl sm:text-5xl font-semibold">{pad(parts.hours)}</div>
        <div className="text-sm uppercase tracking-wide text-gray-600">{l.hours}</div>
      </div>
      <div className="text-4xl sm:text-5xl font-semibold">:</div>
      <div className="text-center">
        <div className="text-4xl sm:text-5xl font-semibold">{pad(parts.minutes)}</div>
        <div className="text-sm uppercase tracking-wide text-gray-600">{l.minutes}</div>
      </div>
      <div className="text-4xl sm:text-5xl font-semibold">:</div>
      <div className="text-center">
        <div className="text-4xl sm:text-5xl font-semibold">{pad(parts.seconds)}</div>
        <div className="text-sm uppercase tracking-wide text-gray-600">{l.seconds}</div>
      </div>
    </div>
  );
};

export default Countdown;
