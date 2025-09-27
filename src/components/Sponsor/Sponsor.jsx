import Slider from "react-slick";
import slider1 from '../../assets/images/sponsor-logos/Alex Team.png'
import slider2 from '../../assets/images/sponsor-logos/Ifikra.svg'
import slider3 from '../../assets/images/sponsor-logos/image 9.png'
import slider4 from '../../assets/images/sponsor-logos/image 10.png'
import slider5 from '../../assets/images/sponsor-logos/Livit.svg'
import slider6 from '../../assets/images/sponsor-logos/masr logo.svg'
import slider7 from '../../assets/images/sponsor-logos/nasa space app alex.jpg'
import slider8 from '../../assets/images/sponsor-logos/nasa-logo.svg'
import slider9 from '../../assets/images/sponsor-logos/وزاره الشباب.svg'

export default function Sponsor() {
  
  var settings = {
    dots: false,
    infinite: true,
    autoplay:true,
    autoplaySpeed:300,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="my-5">
    <h1 className="text-center my-5 text-3xl text-[#AA5868] font-semibold">Our Sponsors</h1>
    <div className="slider-container mx-auto p-5">
         <Slider {...settings}>
      <div className="p-11">
<img src={slider1} alt="" />      
</div>
      <div className="p-11">
<img src={slider2} alt="" />
      </div>
      <div className="p-11">
        <img src={slider3} alt="" />
      </div>
      <div className="p-11">
        <img src={slider4} alt="" />
      </div>
      <div className="p-11">
        <img src={slider5} alt="" />
      </div>
      <div className="p-11">
        <img src={slider6} alt="" />
      </div>
            <div className="p-11">
        <img src={slider7} alt="" />
      </div>
            <div className="p-11">
        <img src={slider8} alt="" className="mx-auto" />
      </div>
            <div className="p-11">
        <img src={slider9} alt="" />
      </div>
    </Slider>
</div>
</div>
  )
}
