import { Suspense, useEffect, useState, lazy } from "react";
import Header from '../../components/Header/Header';
import Sponsor from '../../components/Sponsor/Sponsor';
import Charbot from '../../components/Charbot/Charbot';
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const Cards = lazy(() => import('../../components/Cards/Cards'));
const LetsPlay = lazy(() => import('../LetsPlay/LetsPlay'));

export default function Home() {
  const [plants, setPlants] = useState([]);
  const [season, setSeason] = useState("Seasonally");
  const navigate = useNavigate();

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
  }, []);

  const tabs = ["Seasonally", "Spring", "Summer", "Winter", "Autumn"];

  const handleLearnMore = () => {
    navigate("/explore");
  };

  return (
    <div>
      <Header />
      <Sponsor />

      <div className='bg-[#F0EFE791] p-5' id="explore-section">
        <h1 className="text-5xl text-center w-40 my-5 mx-auto font-bold text-[#3E2723]">
          Explore Egypt's Blooming Seasons
        </h1>
        <p className="text-center my-3 font-semibold text-[#3E2723]">
          Select a season or search for a flower to explore Egypt's blooms.
        </p>

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
            plants={plants}
            season={season}
            showAll={false}
            onLearnMore={handleLearnMore}
          />
        </Suspense>
      </div>

      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      }>
        <div className='p-5' data-aos="zoom-in" id="letsplay-section">
          <LetsPlay />
        </div>
      </Suspense>

      <Charbot />
    </div>
  );
}