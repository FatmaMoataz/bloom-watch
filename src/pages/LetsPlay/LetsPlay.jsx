import game from '../../assets/images/game.png'
import { motion as _motion } from 'framer-motion'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function LetsPlay() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true }) 
  }, [])

  return (
    <_motion.div   
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='flex flex-col-reverse text-center py-5 md:text-left items-center md:justify-around md:flex-row'
    >
      <div 
        className='md:w-96 ms-11'
        data-aos="fade-right" 
      >
        <h1 className='md:text-5xl text-3xl font-bold text-[#3E2723] my-5'>
          Test What You've Learned
        </h1>
        <p 
          className='font-semibold text-[#3E2723] my-5'
          data-aos="fade-up"  
          data-aos-delay="300"
        >
          Ready to play? Try our interactive game and see how seasons and climate affect Egypt's flowers.
        </p>
        <_motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='text-white bg-[#661414] font-semibold py-2 px-3 rounded-3xl cursor-progress hover:opacity-90'
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          Coming Soon 🚀
        </_motion.button>
      </div>
      <_motion.img 
        src={game} 
        className='md:w-4/12 w-7/12 rounded-2xl'
        alt="" 
        loading="lazy"
        data-aos="fade-left"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
    </_motion.div>
  )
}
