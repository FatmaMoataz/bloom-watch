import charbot from '../../assets/images/char2.png'

export default function Charbot() {
  return (
    <div className="group w-32 opacity-60 hover:opacity-100 cursor-pointer fixed bottom-0 right-0">
      <img src={charbot} alt="Chatbot" loading="lazy"/>
      <div className="absolute bottom-full right-2 mb-2 px-3 py-2 bg-white text-sm font-semibold text-[#3E2723] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        <p>Hi! I'm <span className='text-[#E2758B]'>Bloombot</span> your flower buddy</p>
        <p>What's on your mind...?</p>       
      </div>
    </div>
  )
}
