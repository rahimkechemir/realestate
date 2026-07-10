import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
function Header() {
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
        <li className="hidden sm:inline text-slate-700 hover:underline">
          <Link to="/about">About</Link>
        </li>
        <li className=" text-slate-700 hover:underline">
          <Link to="/signin">Sign in</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
