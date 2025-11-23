import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const ProfileEdit = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    try {
        const res = await axios.patch(BASE_URL + "/profile/edit", {
           age, gender, skills, about, photoUrl
        }, {withCredentials: true})
        dispatch(addUser(res?.data?.data));
        setMessage(res?.data?.message);
        setTimeout(() => {
            setMessage("");
        },3000)
    } catch (error) {
        setError(error.response.data)
        setTimeout(() => {
          setError("");
        }, 3000);
    }
  }
  return (
    <div className='flex w-9/12 mx-auto'>
       <div className="card bg-base-100 w-96 shadow-sm mx-auto mt-5">
      <div className="card-body">
        <h2 className="card-title">Profile</h2>
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input disabled value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="input" placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input disabled value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="input" placeholder="Type here" />
            </fieldset>
          </>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Age</legend>
          <input value={age} onChange={(e) => setAge(e.target.value)} type="text" className="input" placeholder="Type here" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <input value={gender} onChange={(e) => setGender(e.target.value)} type="text" className="input" placeholder="Type here" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">SKills</legend>
          <input value={skills} onChange={(e) => setSkills([e.target.value])} type="text" className="input" placeholder="Type here" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">About</legend>
          <input value={about} onChange={(e) => setAbout(e.target.value)} type="text" className="input" placeholder="Type here" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">PhotoUrl</legend>
          <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} type="text" className="input" placeholder="Type here" />
        </fieldset>
        <p className='text-red-700'>{error}</p>
        <div className="card-actions justify-end">
          <button onClick={handleUpdate} className="btn btn-primary">Save Profile</button>
        </div>
       </div>
        {message && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>{message}</span>
        </div>
      </div>}
  </div>
        <UserCard user={{firstName, lastName, gender, age, about, photoUrl,skills}}/>
    </div>
  )
}


export default ProfileEdit