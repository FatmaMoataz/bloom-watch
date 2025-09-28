import game from '../../assets/images/game.png'
import {motion as _motion} from 'framer-motion'

export default function LetsPlay() {
  return (
    <_motion.div   
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      transition={{ duration: 0.5 }}
      className='flex sm:flex-col-reverse sm:text-center py-5 md:text-left sm:items-center md:justify-around md:flex-row'
    >
      <div className='w-96 ms-11'>
        <h1 className='text-5xl font-bold text-[#3E2723] my-5'>Test What You've Learned</h1>
        <p className='font-semibold text-[#3E2723] my-5'>Ready to play? Try our interactive game and see how seasons and climate affect Egypt's flowers.</p>
        <button className='text-white bg-[#661414] font-semibold py-2 px-3 rounded-3xl cursor-progress hover:opacity-90'>
          Coming Soon 🚀
        </button>
      </div>
      <img src={game} className='w-4/12 rounded-2xl' alt="" loading="lazy"/>
    </_motion.div>
  )
}
