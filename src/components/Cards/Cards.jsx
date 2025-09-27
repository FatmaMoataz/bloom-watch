import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion as _motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import './Cards.css'

export default function Explore() {
  const [plants, setPlants] = useState([]);
  const [season, setSeason] = useState("Seasonally");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => setPlants(data.plants));

    AOS.init({ duration: 8000, offset: 100, once: true });
  }, []);

  const tabs = ["Seasonally", "Spring", "Summer", "Winter", "Autumn"];

  const seasonPlants =
    season === "Seasonally"
      ? plants
      : plants.filter((p) => {
          const seasonName = p.bloomSeason.toLowerCase();
          if (season.toLowerCase() === "autumn") {
            return (
              seasonName.includes("autumn") || seasonName.includes("fall")
            );
          }
          return seasonName.includes(season.toLowerCase());
        });

  const firstFour = seasonPlants.slice(0, 4);
  const restPlants = seasonPlants.slice(4);

  const handleDetailsClick = (plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlant(null);
  };

  return (
    <>
      <h1 className="text-5xl text-center w-40 my-5 mx-auto font-bold text-[#3E2723]">
        Explore Egypt's Blooming Seasons
      </h1>
      <p className="text-center my-3 font-semibold text-[#3E2723]">
        Select a season or search for a flower to explore Egypt's blooms.
      </p>

      {/* NavTabs */}
      <div className="flex justify-center space-x-4">
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

      {/* First 4 Plants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mx-24">
        {firstFour.map((plant, i) => (
          <_motion.div
            key={plant.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition flex flex-col"
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
                <h2 className="text-lg font-bold text-[#3E2723]">
                  {plant.englishName}
                </h2>
                <h3 className="text-xs text-gray-500 mb-1">
                  {plant.arabicName}
                </h3>
              </div>
              <p className="text-xs text-gray-600 mt-1 flex-grow">
                {plant.keyFeature}
              </p>
              <button 
                className='text-[#E2758B] cursor-pointer hover:text-[#884653] underline my-1 text-left'
                onClick={() => handleDetailsClick(plant)}
              >
                Details
              </button>
            </div>
          </_motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <_motion.div
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image Section */}
            {selectedPlant.image && (
              <div className="w-full h-52 bg-[#FBEAEE] flex items-center justify-center">
                <img
                  src={selectedPlant.image}
                  alt={selectedPlant.englishName}
                  className="max-h-full object-contain"
                />
              </div>
            )}

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-5">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-[#3E2723]">
                      {selectedPlant.englishName}
                    </h2>
                    <h3 className="text-xs text-gray-500">
                      {selectedPlant.arabicName}
                    </h3>
              </div>

              {/* Plant Details */}
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Scientific Name:</span> {selectedPlant.scientificName}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Family:</span> {selectedPlant.family}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Bloom Season:</span> {selectedPlant.bloomSeason}
                  </p>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold text-[#3E2723]">Key Feature:</span> {selectedPlant.keyFeature}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 cursor-pointer bg-[#E2758B] text-white text-xs rounded hover:bg-[#884653] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </_motion.div>
        </div>
      )}

      {restPlants.length > 0 && (
        <div className="flex justify-center mb-10">
          <_motion.button
            onClick={() => navigate("/explore")}
            className="px-6 py-2 z-10 bg-[#E2758B] text-white cursor-pointer rounded-2xl font-semibold hover:bg-[#884653] transition"
            data-aos="zoom-in"
            data-aos-delay="100"
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            Learn More
          </_motion.button>
        </div>
      )}
    </>
  );
}