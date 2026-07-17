import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md flex justify-between items-center px-4 py-2 border-b-2 border-slate-300 max-w-6xl mx-auto p-3">
      <Link to="/" className="flex items-center gap-2">
      <h1 className="font-bold text-sm sm:text-xl flex-wrap">
        <span className="text-slate-500">Rahim</span>
        <span className="text-slate-700">Estate</span>
      </h1>
      </Link>
      <form className="flex items-center gap-2">
        <input
          type="text"
          placeholder="search"
          className="bg-white   border-2 border-slate-300  rounded-lg px-2 py-1 text-sm sm:text-lg w-24 focus:outline-none sm:w-64"
        ></input>
        <IoSearch className="text-slate-500 border-" />
      </form>
      <ul className="flex gap-8">
        <li className="hidden sm:inline text-slate-700 hover:underline ">
          <Link to="/">Home</Link>
        </li>
        <Link to="/about">
        <li className="hidden sm:inline text-slate-700 hover:underline">
          About</li></Link>
          <Link to="/profile">
          {currentUser ? (
            <img className="rounded-full h-7 w-7 object-cover
            " src={currentUser.avatar} alt="profile" />
            
            ):(
              <li className=" text-slate-700 hover:underline">
                
                Sign in</li>)}
          {currentUser && console.log(currentUser.avatar)}
          </Link>
        
          
        
      </ul>
    </header>
  );
}

export default Header;
