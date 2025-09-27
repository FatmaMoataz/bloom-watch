import charbot from '../../assets/images/char2.png'

export default function Charbot() {
  return (
    <div className="group w-32 opacity-60 hover:opacity-100 cursor-pointer fixed bottom-0 right-0">
      <img src={charbot} alt="Chatbot" />
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Need help? Click me!
      </div>
    </div>
  )
}