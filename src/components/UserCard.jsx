import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const {_id, firstName, lastName, photoUrl, gender, age, skills, about} = user;
  const dispatch = useDispatch();
  const handleRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials: true})            
            dispatch(removeUserFromFeed(userId))
        } catch (error) {
            console.log(error)
        }
  }
  return (
        <div className="card bg-base-100 w-96 shadow-sm mx-auto my-5">
            <figure>
                <img src={photoUrl} alt={firstName}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{`${gender}, ${age}`}</p>}
                <p>skills: {skills?.join(",")} </p>
                <p>{about}</p>
                 <div className="card-actions justify-end">
                    <button onClick={() => handleRequest("ignored", _id)} className="btn btn-primary">Ignore</button>
                    <button onClick={() => handleRequest("interested", _id)} className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
  )
}

export default UserCard