import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { signInFailure,signInStart,signInSuccess } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
function SignIn() {
 const {loading , error} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    } else {
      dispatch(signInSuccess(data));
      navigate("/");
      
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl text-center font-semibold
      my-7"
      >
        Sign In
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-auto flex-col gap-5 mx-auto"
      >
        
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg bg-amber-50 "
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg bg-amber-50 "
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-800"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <OAuth/>
      </form>
      
      <div className="text-center p-5 font-semibold">
        <p>Dont have an account ?</p>
        <Link to={"/signup"} className="text-blue-600">
          Sign up
        </Link>
        
      </div>
      {error && (
        <div className="text-center p-5 font-semibold text-red-600">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default SignIn;
