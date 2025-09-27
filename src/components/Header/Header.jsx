import { useState, useEffect } from "react";
import { AnimatePresence, motion as _motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import earth from "../../assets/images/earth.png";
import GlobalSphere from "../GlobalSphere/GlobalSphere";
import './Header.css'

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); 
  }, []);

  return (
    <>
      <div className="flex items-center md:flex-row md:justify-between sm:flex-col-reverse sm:text-center md:text-left">
        {/* Caption */}
        <div
          className="caption mb-7 md:ms-40 w-40"
          data-aos="fade-right" 
        >
          <h1 className="text-[#3E2723] font-bold text-5xl mx-auto my-2 leading-16">
            Discover Egypt’s Seasonal Blooms🌸
          </h1>
          <p className="text-[#3E2723] font-semibold mx-auto my-2">
            Flowers tell the story of every season. Learn, explore, and play
            your way through Egypt’s unique floral world.
          </p>
<div className="flex">
            <button className="px-5 py-2 cursor-pointer hover:bg-[#8d8711] transition-all rounded-3xl text-white bg-[#67620E] mt-3 me-4 font-semibold">
            Explore
          </button>
          <button className="px-5 py-2 hover:border-[#8d8711] hover:text-[#8d8711] cursor-pointer transition-all rounded-3xl text-[#67620E] border border-[#67620E] mt-3 font-semibold">
            Let's Play
          </button>
</div>
        </div>

        {/* Earth image */}
        <img
          src={earth}
          className="w-80 sm:rotate-90 md:rotate-0 cursor-pointer"
          alt="earth"
          onClick={() => setShowModal(true)}
          data-aos="zoom-in" // AOS effect
        />
      </div>

      {/* Modal with framer-motion */}
      <AnimatePresence>
        {showModal && (
          <_motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <_motion.div
              className="bg-white rounded-xl shadow-lg w-[90%] md:w-[80%] h-[80%] relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute cursor-pointer top-4 right-4 bg-[#E2758B] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[#c75a73] transition z-50 pointer-events-auto"
              >
                ✕
              </button>

              {/* Globe */}
              <div className="w-full h-full relative z-0">
                <GlobalSphere />
              </div>
            </_motion.div>
          </_motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
