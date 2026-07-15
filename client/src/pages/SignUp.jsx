import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

function SignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      
      console.log(data);
      return;
    } else {
      setLoading(false);
      setError(null);
      navigate("/signin");
      console.log(data);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl text-center font-semibold
      my-7"
      >
        Sign Up
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-1/3 mx-auto"
      >
        <input
          type="text"
          placeholder="name"
          className="border p-3 rounded-lg bg-amber-50 "
          id="username"
          onChange={handleChange}
        />
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
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
      <div className="text-center p-5 font-semibold">
        <p>Have an account ?</p>
        <Link to={"/signin"} className="text-blue-600">
          Sign in
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

export default SignUp;
