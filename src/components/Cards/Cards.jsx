import React,{ useState, useRef, useEffect } from "react";
import { motion as _motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import './Cards.css';

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="w-full h-52 bg-[#FBEAEE] flex items-center justify-center">
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && isInView && (
        <div className="w-12 h-12 border-4 border-[#E2758B] border-t-transparent rounded-full animate-spin"></div>
      )}
    </div>
  );
};

const PlantCard = React.memo(({ plant, index, showAll, onDetailsClick }) => {
  return (
    <_motion.div
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition flex flex-col"
      data-aos="fade-up"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <LazyImage 
        src={plant.image} 
        alt={plant.englishName}
        className="max-h-full object-contain"
      />

      <div className="flex flex-col flex-grow p-5">
        {showAll ? (

          <>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#3E2723]">{plant.englishName}</h2>
              <h3 className="text-lg font-bold text-[#3E2723] mb-1">{plant.arabicName}</h3>
            </div>
            <p className="text-sm text-[#E2758B] my-1">
              <span className="text-black/50">Scientific Name: </span>{plant.scientificName}
            </p>
            <p className="text-sm text-[#E2758B] my-1">
              <span className="text-black/50">Family:</span> {plant.family}
            </p>
            <p className="text-sm text-black/50 mt-4 flex-grow">{plant.keyFeature}</p>
          </>
        ) : (

          <>
            <h2 className="text-lg font-bold text-[#3E2723]">
              {plant.englishName}
            </h2>
            <p className="text-sm text-black/50 nmt-1 flex-grow">
              {plant.keyFeature.split(" ").slice(0, 10).join(" ")}...
            </p>
            <button
              className='text-[#E2758B] cursor-pointer hover:text-[#884653] underline my-1 text-left'
              onClick={() => onDetailsClick(plant)}
            >
              Details
            </button>
          </>
        )}
      </div>
    </_motion.div>
  );
});

export default function Cards({ 
  plants = [], 
  season = "All", 
  showAll = false, 
  onLearnMore 
}) {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(showAll ? plants.length : Math.min(plants.length, 8));

  const loadMoreRef = useRef(null);

  const seasonPlants = plants.filter((p) => {
    const seasonName = p.bloomSeason.toLowerCase();
    if (season.toLowerCase() === "all" || season.toLowerCase() === "seasonally") {
      return true;
    }
    if (season.toLowerCase() === "autumn") {
      return seasonName.includes("autumn") || seasonName.includes("fall");
    }
    return seasonName.includes(season.toLowerCase());
  });

  useEffect(() => {
    if (!showAll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => Math.min(prev + 8, seasonPlants.length));
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [showAll, seasonPlants.length]);

  const displayPlants = showAll 
    ? seasonPlants.slice(0, visibleCount)
    : seasonPlants.slice(0, 4);

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
      <div className="grid grid-cols-1 w-9/12 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {displayPlants.length > 0 ? (
          displayPlants.map((plant, i) => (
            <PlantCard
              key={`${plant.id}-${i}`}
              plant={plant}
              index={i}
              showAll={showAll}
              onDetailsClick={handleDetailsClick}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No plants found 🌱
          </p>
        )}
      </div>

      {showAll && visibleCount < seasonPlants.length && (
        <div ref={loadMoreRef} className="flex justify-center my-8">
          <div className="w-12 h-12 border-4 border-[#E2758B] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {isModalOpen && selectedPlant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <_motion.div
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 bg-[#F6D4DB] cursor-pointer rounded-md p-0.5 hover:text-[#E2758B] transition"
            >
              <FiX size={22} />
            </button>

            <LazyImage 
              src={selectedPlant.image} 
              alt={selectedPlant.englishName}
              className="max-h-full object-contain"
            />

            <div className="flex flex-col flex-grow px-5 py-7">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#3E2723]">
                  {selectedPlant.englishName}
                </h2>
                <h3 className="text-lg font-bold text-[#3E2723]">
                  {selectedPlant.arabicName}
                </h3>
              </div>

              <div className="space-y-2">
                <p className="text-[#E2758B]">
                  <span className="text-black/50">Scientific Name:</span> {selectedPlant.scientificName}
                </p>
                <p className="text-[#E2758B]">
                  <span className="text-black/50">Family:</span> {selectedPlant.family}
                </p>
                <p className="text-[#E2758B]">
                  <span className="text-black/50">Season:</span> {selectedPlant.bloomSeason}
                </p>
                <p className="text-[#E2758B]">
                  <span className="text-black/50">Description:</span> {selectedPlant.keyFeature}
                </p>
              </div>
            </div>
          </_motion.div>
        </div>
      )}

      {!showAll && seasonPlants.length > 4 && (
        <div className="flex justify-center mb-10">
          <_motion.button
            onClick={onLearnMore}
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