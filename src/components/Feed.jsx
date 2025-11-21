import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import {useDispatch, useSelector} from "react-redux"
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if(users) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true})
      dispatch(addFeed(res?.data?.users))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
      fetchFeed()
  },[])

  if(users?.length === 0) return <h1 className='text-center font-bold py-5'>You don't have new users today</h1>
  return (
    <div>
      {users && <UserCard user = {users[0]} />}
    </div>
  )
}

export default Feed