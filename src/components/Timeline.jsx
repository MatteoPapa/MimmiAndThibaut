// Timeline.jsx
/* eslint-disable react/prop-types */

const Timeline = ({ events }) => {
  return (
    <div className="relative border-l-1 border-dashed border-[#41403E] mx-auto sm:max-w-2xl pl-8">
      {events.map((event, index) => (
        <div key={index} className="mb-20 relative">
          {/* Time bubble */}
          <div className="absolute -left-[3.5rem] top-0 w-16 h-16 rounded-full backdrop-blur-2xl border-2 border-dashed flex items-center justify-center font-bold text-2xl shadow-md">
            {event.time}
          </div>

          {/* Image + Content */}
          <div className="md:ml-8 pt-20 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={event.image}
              alt={`event-${index}`}
              className="w-40 h-40 object-contain"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-semibold mb-1 text-shadow-gray-500 text-shadow-sm">
                {event.title}
              </h3>
              <p className="text-lg max-w-md">{event.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
