import { useEffect, useState, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiSearch, FiExternalLink } from "react-icons/fi"; 
import Loader from "../../components/Loader/Loader";
import './Explore.css'

const Cards = lazy(() => import('../../components/Cards/Cards'));

export default function Explore() {
  const [plants, setPlants] = useState([]);
  const [season, setSeason] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadPlants = async () => {
      try {
        const response = await fetch("/plants.json");
        const data = await response.json();
        setPlants(data.plants);
      } catch (error) {
        console.error("Failed to load plants:", error);
      }
    };

    loadPlants();
    AOS.init({ duration: 800, offset: 100, once: true });
  }, []);

  const tabs = ["All", "Spring", "Summer", "Winter", "Autumn"];

  const filteredPlants = plants.filter((p) => {
    const matchesSearch =
      p.englishName.toLowerCase().includes(search.toLowerCase()) ||
      p.arabicName.toLowerCase().includes(search.toLowerCase()) ||
      p.scientificName.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleHuggingFaceClick = () => {
    window.open("https://huggingface.co/spaces/mariamomran/Nasa_Flower_Prediction", "_blank");
  };

  return (
    <>

      <button
        onClick={handleHuggingFaceClick}
        className="fixed right-6 bottom-6 z-40 bg-[#A6A139] text-white cursor-pointer rounded-full p-4 shadow-lg hover:bg-[#8a852e] transition-all flex items-center gap-2 group"
        data-aos="fade-left"
        data-aos-delay="500"
      >
        <FiExternalLink size={20} />
        <span className="hidden sm:inline whitespace-nowrap">NASA Flower Prediction</span>
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded py-1 px-2 whitespace-nowrap">
          AI Flower Identification
        </div>
      </button>

      <h1 className="text-5xl text-center my-5 font-bold text-[#3E2723]">
        Explore Egypt's Blooming Seasons
      </h1>
      <p className="text-center my-3 font-semibold text-[#3E2723]">
        Select a season or search for a flower to explore Egypt's blooms.
      </p>

      <div className="flex justify-center mb-6">
        <div className="relative w-80">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A6A139] text-lg" />
          <input
            type="text"
            placeholder="Type a flower name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 bg-white pr-4 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A6A139]"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mb-6 space-y-1 text-center space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSeason(tab)}
            className={`px-4 py-2 font-semibold transition rounded-3xl cursor-pointer ${
              season === tab
                ? "bg-[#A6A139] text-white"
                : "bg-white text-[#A6A139] hover:bg-[#b4ae36] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      }>
        <Cards 
          plants={filteredPlants}
          season={season}
          showAll={true}
        />
      </Suspense>
    </>
  );
}