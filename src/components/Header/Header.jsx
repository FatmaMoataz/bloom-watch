import React,{ useState, useEffect, Suspense } from "react";
import { AnimatePresence, motion as _motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import earth from "../../assets/images/earth.png";
import "./Header.css";
import Loader from "../Loader/Loader";
import { NavLink } from "react-router-dom";


const GlobalSphere = Suspense ? React.lazy(() => import("../GlobalSphere/GlobalSphere")) : null;

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div className="flex items-center sm:justify-center md:flex-row md:justify-between flex-col-reverse text-center md:text-left">
        {/* Caption */}
        <_motion.div
          className="caption mb-7 md:ms-40 md:w-4/12 sm:w-11/12"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <_motion.h1
            className="text-[#3E2723] font-bold text-5xl mx-auto my-2 leading-16"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover Egypt’s Seasonal Blooms🌸
          </_motion.h1>

          <_motion.p
            className="text-[#3E2723] font-semibold mx-auto my-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Flowers tell the story of every season. Learn, explore, and play your way through Egypt’s unique floral world.
          </_motion.p>

        <_motion.div
  className="flex flex-col md:flex-row"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1, duration: 0.8 }}
>
<button
  onClick={() => document.getElementById('explore-section').scrollIntoView({ behavior: 'smooth' })}
  className="px-5 py-2 cursor-pointer hover:bg-[#8d8711] transition-all rounded-3xl text-white bg-[#67620E] mt-3 me-4 font-semibold text-center"
>
  Explore
</button>
<button
  onClick={() => document.getElementById('letsplay-section').scrollIntoView({ behavior: 'smooth' })}
  className="px-5 py-2 hover:border-[#8d8711] hover:text-[#8d8711] cursor-pointer transition-all rounded-3xl text-[#67620E] border border-[#67620E] mt-3 font-semibold text-center"
>
  Let's Play
</button>
</_motion.div>

        </_motion.div>

        {/* Earth image */}
        <img
          src={earth}
          className="md:w-80 w-70 sm:mx-auto md:mx-0 rotate-90 md:rotate-0 cursor-pointer"
          alt="earth"
          loading="lazy"
          onClick={() => setShowModal(true)}
          data-aos="zoom-in"
        />
      </div>

      {/* Modal */}
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
              <button
                onClick={() => setShowModal(false)}
                className="absolute cursor-pointer top-4 right-4 bg-[#E2758B] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[#c75a73] transition z-50 pointer-events-auto"
              >
                ✕
              </button>

              <div className="w-full h-full relative z-0">
                <Suspense fallback={<div className="text-center mt-20"><Loader/></div>}>
                  <GlobalSphere />
                </Suspense>
              </div>
            </_motion.div>
          </_motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
