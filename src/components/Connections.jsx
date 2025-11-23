import axios from "axios"
import {BASE_URL} from "../utils/constants"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector(store => store.connections)
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/connections", {withCredentials: true})
      dispatch(addConnection(res?.data?.newConnections))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchConnections();
  },[])
 if(!connections) return;
 if(connections?.length === 0) return <h1 className="text-center mt-5">You don't have connections</h1>

  return (
          <div className="flex flex-col">
            <h1 className="text-center font-bold mt-10 text-3xl">Connections</h1>
            {connections?.map((connection) => {
                const {_id, firstName, lastName, photoUrl, age, gender, about, skills} = connection;
                    return (
                        <div key={_id} className="card items-center card-side bg-base-100 shadow-sm w-6/12 mx-auto my-5 p-5">
                            <div className="w-[15%]">
                                <img className="w-25 h-25" src={photoUrl} alt={firstName} />
                            </div>
                            <div className="card-body w-[85%]">
                                <h2 className="card-title">{firstName + " " + lastName}</h2>
                                {age && gender && <p>{`${gender}, ${age}`}</p>}
                                <p>skills: {skills?.join(",")} </p>
                                <p>{about}</p>
                            </div>
                        </div>
                )
            })}
          </div>
  )
}

export default Connections