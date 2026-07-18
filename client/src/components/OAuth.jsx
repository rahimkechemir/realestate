import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from '../Firebase.js';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

function OAuth() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("cant signin with google", error);
      dispatch(signInFailure(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleClick}
        type='button'
        disabled={loading}
        className='w-auto bg-red-600 text-white rounded-lg p-3 uppercase hover:bg-red-700 disabled:opacity-70'
      >
        {loading ? "loading..." : "continue with google"}
      </button>
    </div>
  );
}

export default OAuth