import { useEffect, useState } from "react";
import Slider from "react-slick";

import slider1 from '../../assets/images/sponsor-logos/Alex Team.png';
import slider2 from '../../assets/images/sponsor-logos/Ifikra.svg';
import slider3 from '../../assets/images/sponsor-logos/image 9.png';
import slider4 from '../../assets/images/sponsor-logos/image 10.png';
import slider5 from '../../assets/images/sponsor-logos/Livit.svg';
import slider6 from '../../assets/images/sponsor-logos/masr logo.svg';
import slider7 from '../../assets/images/sponsor-logos/nasa space app alex.jpg';
import slider8 from '../../assets/images/sponsor-logos/nasa-logo.svg';
import slider9 from '../../assets/images/sponsor-logos/وزاره الشباب.svg';

export default function Sponsor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const sliders = [slider1, slider2, slider3, slider4, slider5, slider6, slider7, slider8, slider9];

  if (!mounted) {
    return <div>Loading sponsors...</div>;
  }

  return (
    <div className="my-8 py-6">
      <h1 className="text-center my-6 text-3xl text-[#AA5868] font-semibold">Our Sponsors</h1>
      <div className="slider-container px-4">
        <Slider {...settings}>
          {sliders.map((src, idx) => (
            <div key={idx} className="px-2">
              <div className="flex justify-center items-center h-32 p-4">
                <img 
                  src={src} 
                  alt={`Sponsor ${idx + 1}`} 
                  className="max-h-20 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}