import Header from '../../components/Header/Header'
import Sponsor from '../../components/Sponsor/Sponsor'
import Cards from '../../components/Cards/Cards'
import LetsPlay from '../LetsPlay/LetsPlay'
import Charbot from '../../components/Charbot/Charbot'

export default function Home() {

  return (
<div>
    <Header/>
    <Sponsor/>
    <div className='bg-[#F0EFE791] p-5 '><Cards/></div>
     <div className='p-5 ' data-aos="zoom-in"><LetsPlay/></div>
<Charbot/>
</div>
  )
}
