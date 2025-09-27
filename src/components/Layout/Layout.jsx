import Footer from '../Footer/Footer'
import Appbar from '../Appbar/Appbar'
import {Outlet} from 'react-router-dom'

export default function Layout() {
  return (
    <div>
<Appbar/>
<Outlet/>
<Footer/>

    </div>
  )
}
