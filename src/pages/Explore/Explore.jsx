import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion as _motion } from "framer-motion";
import { FiSearch } from "react-icons/fi"; 
import './Explore.css'

export default function Explore() {
  const [plants, setPlants] = useState([]);
  const [season, setSeason] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => setPlants(data.plants));

    AOS.init({ duration: 800, offset: 100, once: true });
  }, []);

  const tabs = ["All", "Spring", "Summer", "Winter", "Autumn"];

  const seasonPlants = plants.filter((p) => {
    const matchesSeason =
      season === "All" ||
      p.bloomSeason.toLowerCase().includes(season.toLowerCase());

    const matchesSearch =
      p.englishName.toLowerCase().includes(search.toLowerCase()) ||
      p.arabicName.toLowerCase().includes(search.toLowerCase());

    return matchesSeason && matchesSearch;
  });

  return (
    <>
      <h1 className="text-5xl text-center my-5 font-bold text-[#3E2723]">
        Explore Egypt's Blooming Seasons
      </h1>
      <p className="text-center my-3 font-semibold text-[#3E2723]">
        Select a season or search for a flower to explore Egypt’s blooms.
      </p>

      <div className="flex justify-center mb-6">
        <div className="relative w-80">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A6A139] text-lg" />
          <input
            type="text"
            placeholder="Type a flower name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A6A139]"
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

      <div className="grid grid-cols-1 w-9/12 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {seasonPlants.length > 0 ? (
          seasonPlants.map((plant, i) => (
            <_motion.div
              key={plant.id}
              className="shadow-md rounded-lg overflow-hidden hover:shadow-xl transition flex flex-col"
              data-aos="fade-up"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              {plant.image && (
                <div className="w-full h-52 bg-[#FBEAEE] flex items-center justify-center">
                  <img
                    src={plant.image}
                    alt={plant.englishName}
                    className="max-h-full object-contain"
                  />
                </div>
              )}

              <div className="flex flex-col flex-grow p-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-[#3E2723]">{plant.englishName}</h2>
                  <h3 className="text-xs text-gray-500 mb-1">{plant.arabicName}</h3>
                </div>
                <p className="text-xs text-gray-500 my-1">Scientific Name: {plant.scientificName}</p>
                <p className="text-xs text-gray-500 my-1">Family: {plant.family}</p>
                <p className="text-xs text-gray-600 mt-1 flex-grow">{plant.keyFeature}</p>              
              </div>
            </_motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No plants found matching your search 🌱
          </p>
        )}
      </div>
    </>
  );
}
