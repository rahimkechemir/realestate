import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutStart,
  signInFailure,
  signoutSuccess,
  signoutFailure,
} from "../redux/user/userSlice.js";
import { Link } from "react-router-dom";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data))
    } catch (error) {
      dispatch(signoutFailure(data.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-auto flex-col gap-5 mx-auto"
      >
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-20 w-20 object-cover self-center mt-4 cursor-pointer"
        />
        <input
          type="text"
          id="username"
          placeholder="name"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border w-auto border-gray-700 bg-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border w-auto border-gray-700 bg-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
          className="border border-gray-700 bg-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 uppercase text-white rounded-md py-2 px-4 hover:bg-slate-800 transition-colors duration-300 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>

        <Link className="bg-green-700 text-white
        p-3 uppercase rounded-lg text-center hover:opacity-95" to={'/create-listing'}>
        create listing </Link>
      </form>
      <div className="flex justify-center gap-4 mt-6">
        <span
          onClick={handleDeleteUser}
          className="text-red-600 uppercase cursor-pointer hover:underline"
        >
          delete account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-600 uppercase cursor-pointer hover:underline"
        >
          sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error && error}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "User updated successfully!"}
      </p>
    </div>
  );
}

export default Profile;
