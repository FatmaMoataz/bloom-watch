import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; 
import logo from "../../assets/images/BloomSphere logo.svg";
import { motion as _motion} from "framer-motion";

export default function Appbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-2 bg-[rgba(255,255,255,0.99)]">

      <img src={logo} alt="BloomSphere" className="w-28" />

      {/* Navigation hidden on mobile */}
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

      {/* Buttons (hidden on mobile) */}
      <div className="hidden md:flex gap-2">
        <button className="text-white bg-[#E2758B] px-3 py-2 cursor-pointer hover:bg-[#e0657d] rounded-xl">
          Login
        </button>
        <button className="text-[#E2758B] px-3 py-2 cursor-pointer hover:text-[#e0657d] rounded-xl">
          Sign Up
        </button>
      </div>

      {/* Hamburger button (only mobile) */}
      <button
        className="md:hidden text-2xl text-[#E2758B]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-28 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-6 md:hidden z-50">
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

          <div className="flex gap-2">
            <button className="text-white bg-[#E2758B] px-3 py-2 rounded-xl">
              Login
            </button>
            <button className="text-[#E2758B] px-3 py-2 rounded-xl">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
