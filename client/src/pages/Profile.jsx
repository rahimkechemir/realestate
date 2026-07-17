import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-center text-3xl font-semibold
      my-7'>Profile</h1>
      <form className='flex  w-auto flex-col gap-5 w-1/3 mx-auto'>
        <img src={currentUser.avatar} alt="profile" 
        className="rounded-full h-20 w-20 object-cover self-center mt-4 cursor-pointer " />
        <input
          type="text" id='username'
          placeholder="name"
          defaultValue={currentUser.username}
          className="border w-auto border-gray-700 bg-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email" id='email'
          placeholder="email" 
          defaultValue={currentUser.email}
          className="border w-auto border-gray-700 bg-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="password" id='password' 
          defaultValue={currentUser.hashPassword}
          className="border border-gray-700 bg-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-slate-700 uppercase text-white rounded-md py-2 px-4 hover:bg-slate-800 transition-colors duration-300"
        >
          Update Profile
        </button>  

      </form>
      <div className="flex justify-center gap-4 mt-6">
        <span className='text-red-600 uppercase cursor-pointer hover:underline'>
          delete account
        </span>
        <span className='text-red-600 uppercase cursor-pointer hover:underline'>
          sign out
        </span>


      </div>
    </div>
  )
}

export default Profile
