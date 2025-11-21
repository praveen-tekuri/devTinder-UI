import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
            <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body