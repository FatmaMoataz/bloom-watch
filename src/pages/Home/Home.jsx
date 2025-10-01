import React, { Suspense } from "react";
import Header from '../../components/Header/Header';
import Sponsor from '../../components/Sponsor/Sponsor';
import Charbot from '../../components/Charbot/Charbot';
import Loader from "../../components/Loader/Loader";

const Cards = React.lazy(() => import('../../components/Cards/Cards'));
const LetsPlay = React.lazy(() => import('../LetsPlay/LetsPlay'));

export default function Home() {
  return (
    <div>
      <Header />

         <Sponsor />


      <Suspense fallback={<div><Loader/></div>}>
        <div className='bg-[#F0EFE791] p-5'>
          <Cards />
        </div>
      </Suspense>

      <Suspense fallback={<div><Loader/></div>}>
        <div className='p-5' data-aos="zoom-in">
          <LetsPlay />
        </div>
      </Suspense>

      <Charbot />

    </div>
  );
}
