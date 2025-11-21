import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId, setEmailId] = useState("praveen@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
        const res = await axios.post("http://localhost:7780/login", {emailId, password}, {withCredentials: true});
        navigate("/");     
    } catch (error) {
        setError(error.response.data || "Something went wrong")
        setTimeout(() => {
          setError("")
        },3000)
    }
  }
  return (
      <div className="card bg-base-100 w-96 shadow-sm mx-auto mt-5">
      <div className="card-body">
        <h2 className="card-title">Login Now</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your emailId?</legend>
          <input value={emailId} onChange={(e) => setEmailId(e.target.value)} type="text" className="input" placeholder="Type here" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your password?</legend>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="input" placeholder="Type here" />
        </fieldset>
        <p className='text-red-700'>{error}</p>
        <div className="card-actions justify-end">
          <button onClick={fetchUser} className="btn btn-primary">Login Now</button>
        </div>
      </div>
  </div>
  )
}

export default Login