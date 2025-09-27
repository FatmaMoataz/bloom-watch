import { NavLink } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

export default function Footer() {

  return (
    <div className='bg-[#3E2723] p-8'>
{/* Upper Part */}
<div className='flex justify-between sm:flex-col md:flex-row sm:text-center md:text-left gap-6'>
<div className="flex items-center gap-2 text-white w-72 mx-auto">
  <img src={logo} alt="" />
<p>A NASA Space Apps Challenge project bringing Egypt’s flowers to life.</p>
</div>
<div className="flex gap-9 sm:flex-col md:flex-row">

<div>
  <h1 className="text-white font-semibold">Navigation</h1>
  <NavLink to={'/home'}><span className="text-[#F6D4DB73] hover:text-[#f8f1f273]">Home | </span></NavLink>
   <NavLink to={'/explore'}><span className="text-[#F6D4DB73] hover:text-[#f8f1f273]">Explore | </span></NavLink>
    <NavLink to={'/lets-play'}><span className="text-[#F6D4DB73] hover:text-[#f8f1f273]">Let's Play</span></NavLink>
</div>

<div>
  <h1 className="text-white font-semibold">Our Information</h1>
  <p className="text-[#F6D4DB73] hover:text-[#f8f1f273] cursor-pointer">Privacy</p>
  <p className="text-[#F6D4DB73] hover:text-[#f8f1f273] cursor-pointer">User Terms & Condition</p>
</div>

<div>
  <h1 className="text-white font-semibold">Contact Team Info</h1>
  <p className="text-[#F6D4DB73] hover:text-[#f8f1f273] cursor-pointer">+20 1234567890</p>
  <p className="text-[#F6D4DB73] hover:text-[#f8f1f273] cursor-pointer">BloomSphere@blazemeter.com</p>
  <p className="text-[#F6D4DB73] hover:text-[#f8f1f273] cursor-pointer">2390 El Camino Real</p>
</div>

</div>
</div>
{/* Lower Part */}
<div className="text-center mt-5 text-[#F6D4DB73]">
  <p>🌍 Credits — Based on NASA Earth observations + Egyptian flower data</p>
  <p>© 2025 BloomSphere All Rights Reserved.</p>
</div>
    </div>
  )
}
