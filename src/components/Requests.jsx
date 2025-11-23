import axios from "axios"
import {BASE_URL} from '../utils/constants'
import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { addRequest, removeUserFromRequest } from "../utils/requests"

const Requests = () => {
const requests = useSelector((store) => store.requests);
const dispatch = useDispatch();
const fetchRequests = async() => {
  try {
    const res = await axios.get(BASE_URL + "/profile/requests", {withCredentials: true})
    dispatch(addRequest(res?.data?.requests))
  } catch (error) {
    console.log(error)
  }
}

  const handleRequest = async (status, userId) => {
      try {
        const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + userId, {}, {withCredentials: true})
        dispatch(removeUserFromRequest(userId));
    } catch (error) {
        console.log(error?.response?.data)
      }
  }

  useEffect(() => {
    fetchRequests();
  },[])

  if(!requests) return <h1 className="text-center mt-5 font-bold">You don't have requests</h1>

  return (
          <div className="flex flex-col">
            <h1 className="text-3xl text-center mt-5">Requests</h1>
            {requests?.map((request) => {
                const {_id, firstName, lastName, photoUrl, age, gender, about, skills} = request.fromUserId;
                    return (
                        <div key={_id} className="card items-center card-side bg-base-100 shadow-sm w-6/12 mx-auto my-5 p-5">
                            <div>
                                <img className="w-25 h-25" src={photoUrl} alt={firstName} />
                            </div>
                            <div className="card-body">
                                <h2 className="card-title">{firstName + " " + lastName}</h2>
                                {age && gender && <p>{`${gender}, ${age}`}</p>}
                                <p>skills: {skills?.join(",")} </p>
                                <p>{about}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleRequest("rejected", request._id)} className="btn btn-primary">Decline</button>
                                <button onClick={() => handleRequest("accepted", request._id)} className="btn btn-secondary">Accept</button>
                            </div>
                        </div>
                )
            })}
          </div>
  )
}

export default Requests