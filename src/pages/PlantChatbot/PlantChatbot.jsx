import { useState, useEffect } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import charbot from '../../assets/images/char2.png';
import { FiSend } from "react-icons/fi";

export default function PlantChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [plantsData, setPlantsData] = useState({ plants: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlantsData = async () => {
      try {
        const response = await fetch('/plants.json');
        const data = await response.json();
        setPlantsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading plants data:', error);
        setLoading(false);
      }
    };

    fetchPlantsData();
  }, []);

  const questions = [
    "What plants bloom in spring?",
    "Tell me about Date Palms",
    "How do I care for Jasmine?",
    "What plants grow in the Sinai?",
    "Show me medicinal plants",
    "What's the scientific name for Olive Tree?"
  ];

  const getBotReply = (question) => {

    if (loading) {
      return "I'm still learning about plants... Please wait a moment! 🌱";
    }

    if (!plantsData.plants || plantsData.plants.length === 0) {
      return "I'm having trouble accessing plant information right now. Please try again later.";
    }

    const text = question.toLowerCase();

    if (text.includes("bloom in spring") || text.includes("spring bloom")) {
      const springPlants = plantsData.plants.filter(p =>
        p.bloomSeason && p.bloomSeason.toLowerCase().includes("spring")
      );
      if (springPlants.length > 0) {
        return `🌼 Spring bloomers include: ${springPlants.map(p => 
          `${p.englishName} (${p.arabicName})`
        ).join(", ")}.`;
      }
      return "I couldn't find any plants that bloom in spring.";
    }

    if (text.includes("bloom") || text.includes("flowering")) {
      const season = extractSeason(text);
      if (season) {
        const seasonPlants = plantsData.plants.filter(p =>
          p.bloomSeason && p.bloomSeason.toLowerCase().includes(season)
        );
        if (seasonPlants.length > 0) {
          return `🌸 ${season.charAt(0).toUpperCase() + season.slice(1)} bloomers: ${seasonPlants.map(p => 
            `${p.englishName} - ${p.bloomSeason}`
          ).join(", ")}`;
        }
        return `I couldn't find any plants that bloom in ${season}.`;
      }
    }

    if (text.includes("date palm")) {
      const palm = plantsData.plants.find(p => p.englishName === "Date Palm");
      return formatPlantResponse(palm, "Date Palm");
    }

    if (text.includes("jasmine")) {
      const jasmine = plantsData.plants.find(p => p.englishName === "Jasmine");
      return formatPlantResponse(jasmine, "Jasmine");
    }

    if (text.includes("olive")) {
      const olive = plantsData.plants.find(p => p.englishName === "Olive Tree");
      return formatPlantResponse(olive, "Olive Tree");
    }

    if (text.includes("family") || text.includes("lamiaceae") || text.includes("mint")) {
      const family = extractFamily(text);
      if (family) {
        const familyPlants = plantsData.plants.filter(p => 
          p.family && p.family.toLowerCase().includes(family.toLowerCase())
        );
        if (familyPlants.length > 0) {
          return `🌿 Plants in the ${family} family: ${familyPlants.map(p => 
            `${p.englishName} (${p.arabicName})`
          ).join(", ")}`;
        }
        return `I couldn't find any plants in the ${family} family.`;
      }
    }

    if (text.includes("medicinal") || text.includes("healing") || text.includes("medicine")) {
      const medicinalPlants = plantsData.plants.filter(p => 
        p.keyFeature && (
          p.keyFeature.toLowerCase().includes("medicinal") || 
          p.keyFeature.toLowerCase().includes("healing") ||
          p.keyFeature.toLowerCase().includes("herbal") ||
          p.englishName.toLowerCase().includes("aloe") ||
          p.englishName.toLowerCase().includes("chamomile")
        )
      );
      if (medicinalPlants.length > 0) {
        return `💊 Medicinal plants: ${medicinalPlants.map(p => 
          `${p.englishName} - ${p.keyFeature.split('.')[0]}`
        ).join(". ")}`;
      }
      return "I couldn't find information about medicinal plants.";
    }

    if (text.includes("scientific name") || text.includes("latin name")) {
      const plantName = extractPlantName(text);
      if (plantName) {
        const plant = plantsData.plants.find(p => 
          (p.englishName && p.englishName.toLowerCase().includes(plantName)) ||
          (p.arabicName && p.arabicName.toLowerCase().includes(plantName))
        );
        if (plant) {
          return `🔬 The scientific name for ${plant.englishName} (${plant.arabicName}) is *${plant.scientificName}* in the ${plant.family} family.`;
        }
      }
    }

    if (text.includes("sinai") || text.includes("arid") || text.includes("desert")) {
      const desertPlants = plantsData.plants.filter(p => 
        p.keyFeature && (
          p.keyFeature.toLowerCase().includes("arid") ||
          p.keyFeature.toLowerCase().includes("desert") ||
          p.keyFeature.toLowerCase().includes("hardy") ||
          (p.englishName && (
            p.englishName.toLowerCase().includes("acacia") ||
            p.englishName.toLowerCase().includes("date palm") ||
            p.englishName.toLowerCase().includes("thyme")
          ))
        )
      );
      if (desertPlants.length > 0) {
        return `🏜️ In Sinai and arid regions, you'll find: ${desertPlants.map(p => 
          `${p.englishName} - ${p.keyFeature ? p.keyFeature.split('.')[0] : 'Desert plant'}`
        ).join(". ")}`;
      }
      return "I couldn't find specific information about Sinai plants.";
    }

    const foundPlant = plantsData.plants.find(p => 
      (p.englishName && p.englishName.toLowerCase().includes(text)) ||
      (p.arabicName && p.arabicName.toLowerCase().includes(text)) ||
      (p.scientificName && p.scientificName.toLowerCase().includes(text))
    );

    if (foundPlant) {
      return formatPlantResponse(foundPlant, foundPlant.englishName);
    }

    return "Sorry, I don't have information about that yet. Try asking about specific plants, bloom seasons, or plant families! 🌱";
  };

  const formatPlantResponse = (plant, name) => {
    if (!plant) return `I couldn't find information about ${name}.`;
    
    return `🌿 **${plant.englishName}** (${plant.arabicName})
    
🔬 *Scientific Name*: ${plant.scientificName}
👪 *Family*: ${plant.family}
🌸 *Bloom Season*: ${plant.bloomSeason}
💫 *Key Feature*: ${plant.keyFeature}`;
  };

  const extractSeason = (text) => {
    const seasons = ["spring", "summer", "autumn", "fall", "winter"];
    return seasons.find(season => text.includes(season));
  };

  const extractFamily = (text) => {
    const families = ["lamiaceae", "fabaceae", "oleaceae", "asteraceae", "asphodelaceae"];
    const found = families.find(family => text.includes(family));
    if (found) return found;
    
    if (text.includes("mint")) return "Lamiaceae";
    if (text.includes("bean") || text.includes("pea")) return "Fabaceae";
    if (text.includes("daisy")) return "Asteraceae";
    
    return null;
  };

  const extractPlantName = (text) => {
    if (!plantsData.plants) return null;
    const plants = plantsData.plants.map(p => p.englishName && p.englishName.toLowerCase());
    return plants.find(plant => plant && text.includes(plant));
  };

  const handleSend = (question) => {
    if (!question && !input) return;
    const userMsg = question || input;

    if (!started) setStarted(true);

    const reply = getBotReply(userMsg);
 
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 500);
    
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 10, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  };

  const botAvatarVariants = {
    initial: { scale: 1 },
    wave: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.6,
        repeat: 1
      }
    }
  };

  return (
    <_motion.div 
      className="py-7"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <_motion.div className="text-center" variants={itemVariants}>
        <_motion.img 
          src={charbot} 
          className="mx-auto md:w-4/12 w-6/12" 
          alt="chatbot"
          variants={botAvatarVariants}
          initial="initial"
          animate={messages.length === 0 ? "wave" : "initial"}
        />
        <_motion.h1 
          className="font-bold md:text-4xl text-2xl text-[#463525] mt-5"
          variants={itemVariants}
        >
          What's on your mind?
        </_motion.h1>
      </_motion.div>

      <_motion.div 
        className="text-[#463525] mx-6 md:mx-44 my-14"
        variants={itemVariants}
      >
        <div className="p-6 h-96 flex flex-col justify-end overflow-hidden">
          <div className="flex-1 overflow-y-auto mb-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <_motion.div
                  key={i}
                  variants={messageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`my-2 p-3 rounded-lg max-w-xs ${
                    msg.from === "user"
                      ? "ml-auto bg-[#E2758B] text-white"
                      : "mr-auto bg-white border border-gray-200 whitespace-pre-line"
                  }`}
                >
                  {msg.text}
                </_motion.div>
              ))}
            </AnimatePresence>
          </div>

          <_motion.div 
            className="relative flex items-center mt-2"
            variants={itemVariants}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about plants, seasons, families..."
              className="flex-grow border bg-white border-gray-300 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E2758B]"
              disabled={loading}
            />
            <_motion.button
              onClick={() => handleSend()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-3 cursor-pointer flex items-center text-[#E2758B] hover:text-[#b35465]"
              disabled={loading}
            >
              <FiSend size={20} />
            </_motion.button>
          </_motion.div>

          {loading && (
            <_motion.div 
              className="text-center text-gray-500 my-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Loading plant knowledge...
            </_motion.div>
          )}

          <AnimatePresence>
            {!started && !loading && (
              <_motion.div 
                className="my-5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <_motion.h2 
                  className="text-lg font-semibold mb-2"
                  variants={itemVariants}
                >
                  Try asking about:
                </_motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {questions.map((q, i) => (
                    <_motion.div
                      key={i}
                      onClick={() => handleSend(q)}
                      whileHover={{ 
                        scale: 1.02, 
                        backgroundColor: "#e8dcd2",
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#f0e6de] border border-[#e0d4c8] rounded-xl p-3 shadow hover:shadow-md transition cursor-pointer text-center font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                    >
                      {q}
                    </_motion.div>
                  ))}
                </div>
              </_motion.div>
            )}
          </AnimatePresence>
        </div>
      </_motion.div>
    </_motion.div>
  );
}