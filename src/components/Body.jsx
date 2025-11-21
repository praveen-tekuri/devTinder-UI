import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BASE_URL} from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async() => {
    if(userData) return; 
    try {
        const res = await axios.get(BASE_URL + "/profile/view", {withCredentials: true})
        dispatch(addUser(res?.data))
    } catch (error) {
      if(error.status === 401){ // if token does not exists, navigate user to login page
        navigate("/login");
      }
    }
  }
  useEffect(() => {
    fetchUser();
  },[])
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
            <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body