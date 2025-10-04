import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; 
import logo from "../../assets/images/BloomSphere logo.svg";

export default function Appbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  const googleAccounts = [
    {
      name: "Trying", 
      email: "attesting011@gmail.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    }
  ];

  return (
    <div className="flex text-lg justify-between items-center p-2 bg-[rgba(255,255,255,0.99)] relative">

      <NavLink to="/">
        <img src={logo} alt="BloomSphere" className="w-28 cursor-pointer" />
      </NavLink>

      <ul className="hidden md:flex space-x-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#E2758B] font-semibold" : "text-[#67620E] hover:text-[#E2758B]"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "text-[#E2758B] font-semibold" : "text-[#67620E] hover:text-[#E2758B]"
            }
          >
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/lets-play"
            className={({ isActive }) =>
              isActive ? "text-[#E2758B] font-semibold" : "text-[#67620E] hover:text-[#E2758B]"
            }
          >
            Let's Play
          </NavLink>
        </li>
      </ul>

      <div className="hidden md:flex gap-2 relative">
        <div 
          className="relative"
          onMouseEnter={() => setIsLoginDropdownOpen(true)}
          onMouseLeave={() => setIsLoginDropdownOpen(false)}
        >
          <button className="text-white bg-[#E2758B] px-4 py-2 cursor-pointer hover:bg-[#e0657d] rounded-xl transition-colors">
            Login
          </button>
          {isLoginDropdownOpen && (
            <div className="absolute top-12 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    className="w-5 h-5"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Sign in to BloomSphere</h3>
                    <p className="text-xs text-gray-500">with Google</p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                {googleAccounts.map((account, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer text-left"
                    onClick={() => {
                      console.log("Selected account:", account.email);
                      setIsLoginDropdownOpen(false);
                    }}
                  >
                    <img 
                      src={account.avatar} 
                      alt={account.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{account.name}</p>
                      <p className="text-xs text-gray-500 truncate">{account.email}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">+</span>
                  </div>
                  <span className="text-sm text-gray-700">Use another account</span>
                </button>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  To continue, Google will share your name, email address, and profile picture with BloomSphere.
                </p>
              </div>
            </div>
          )}
        </div>

        <button className="text-[#E2758B] px-4 py-2 cursor-pointer hover:text-[#e0657d] rounded-xl border border-[#E2758B] hover:border-[#e0657d] transition-colors">
          Sign Up
        </button>
      </div>
      <button
        className="md:hidden text-2xl text-[#E2758B] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {isOpen && (
        <div className="absolute top-28 left-0 w-full cursor-pointer bg-white shadow-lg flex flex-col items-center gap-4 py-6 md:hidden z-50">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-[#E2758B] font-semibold" : "text-gray-700"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-[#E2758B] font-semibold" : "text-gray-700"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/lets-play"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-[#E2758B] font-semibold" : "text-gray-700"
            }
          >
            Let's Play
          </NavLink>

          <div className="flex flex-col gap-3 w-full px-8">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    className="w-5 h-5"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Sign in to BloomSphere</h3>
                    <p className="text-xs text-gray-500">with Google</p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                {googleAccounts.map((account, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer text-left"
                    onClick={() => {
                      console.log("Selected account:", account.email);
                      setIsOpen(false);
                    }}
                  >
                    <img 
                      src={account.avatar} 
                      alt={account.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{account.name}</p>
                      <p className="text-xs text-gray-500 truncate">{account.email}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">+</span>
                  </div>
                  <span className="text-sm text-gray-700">Use another account</span>
                </button>
              </div>
            </div>
            <button className="text-[#E2758B] px-4 py-3 rounded-xl cursor-pointer hover:text-[#e0657d] border border-[#E2758B] hover:border-[#e0657d] transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}