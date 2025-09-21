import { useNavigate } from "react-router-dom";

const AboutNavbar = ({ tabs, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:flex items-center gap-4 mb-8 fixed top-4 left-1/2 -translate-x-1/2 z-50">
      {/* Home Icon */}
      <button
        onClick={() => navigate("/")}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <img src="images/home.png" alt="Home Icon" className="h-10 w-10" />
      </button>

      {/* Desktop Tabs */}
      <div className="flex shadow rounded-3xl overflow-hidden bg-white bg-opacity-90 backdrop-blur-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-lg sm:text-xl flex items-center gap-2 transition hover:bg-gray-100 ${
              activeTab === tab.key ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            <img src={tab.icon} alt={tab.label} className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AboutNavbar;
