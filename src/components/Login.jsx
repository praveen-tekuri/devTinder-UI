import axios from 'axios'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("praveen@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
        const res = await axios.post("http://localhost:7780/login", {emailId, password}, {withCredentials: true});
        dispatch(addUser(res?.data?.data));
        return navigate("/");     
    } catch (error) {
        setError(error.response.data || "Something went wrong")
        setTimeout(() => {
          setError("")
        },3000)
    }
  }
  const handleSignUp = async() => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {firstName, lastName, emailId, password});
      setFirstName("");
      setLastName("");
      setEmailId("");
      setPassword("");
      setMessage(res?.data?.message);
      setTimeout(() => {
        setMessage("");
        setIsLoginForm(true);
      }, 1000);
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
        <h2 className="card-title">{isLoginForm ? "Login Now": "SignUp Now"}</h2>
        {!isLoginForm && (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="input" placeholder="Type here" />
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="input" placeholder="Type here" />
            </fieldset>
          </>
        )}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your emailId?</legend>
          <input value={emailId} onChange={(e) => setEmailId(e.target.value)} type="text" className="input" placeholder="Type here" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="input" placeholder="Type here" />
        </fieldset>
        <p className='text-red-700'>{error}</p>
        <div className="card-actions justify-end">
          <button onClick={isLoginForm ? fetchUser: handleSignUp} className="btn btn-primary">{isLoginForm ? "Login" : "SignUp"}</button>
        </div>
      <p onClick={() => setIsLoginForm((value) => !value)}>
          {isLoginForm ? "New User? SignUp here": "Existing User? Login here"}
      </p>
      </div>
      {message && <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>}
  </div>
  )
}

export default Login