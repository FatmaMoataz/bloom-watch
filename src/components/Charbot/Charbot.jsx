import charbot from '../../assets/images/char2.png'
import { FiPlus, FiPaperclip, FiMic, FiSend } from "react-icons/fi";

export default function Charbot() {

  const handleClick = () => {
 
    window.open('https://bloombot.lovable.app/', '_blank');
    
  }

  return (
    <div 
      onClick={handleClick}
      className="group w-24 opacity-60 hover:opacity-100 cursor-pointer fixed bottom-0 right-0"
    >
      <img src={charbot} alt="Chatbot" loading="lazy"/>
      <div className="absolute bottom-full right-2 mb-2 px-5 py-5 bg-white text-sm font-semibold text-[#3E2723] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        <div className='mb-0.5'>
          <p>Hi! I'm <span className='text-[#E2758B]'>Bloombot</span> your flower buddy</p>
        </div>
        <p className='text-[#C3BCBB] mb-0.5'>What's on your mind...?</p>   
        <div className='flex justify-between text-lg mt-5 text-[#AA5868]'>
          <div className='flex gap-2'>
            <FiPlus/>
            <FiPaperclip/>
            <FiMic/>
          </div>         
          <FiSend/>        
        </div>    
      </div>        
    </div>
  )
}