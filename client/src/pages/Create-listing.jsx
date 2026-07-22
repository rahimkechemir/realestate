import React from "react";

function Createlisting() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center uppercase text-3xl font-semibold my-7">
        create a listing
      </h1>
      <form action="" className="mt-5 flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg bg-white"
            id="name"
            maxLength="64"
            minLength="10"
            required
          />

          <input
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg bg-white"
            id="description"
          />

          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg bg-white"
            id="address"
            required
          />

          <div className="mt-5 flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="mt-5 flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="bg-white p-2 border border-gray-500 rounded-lg"
              />
              <span>bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                className="bg-white p-2 border border-gray-500 rounded-lg"
              />
              <span>bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularprice"
                min="1"
                max="10"
                className="bg-white p-2 border border-gray-500 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <span>regular price</span>
                <span className="text-xs">$ / month</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedprice"
                min="1"
                max="10"
                className="bg-white p-2 border border-gray-500 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <span>discounted price</span>
                <span className="text-xs">$ / month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-1 flex-col ml-15">
            <p className="font-semibold">images:
                <span className="font-normal text-grey-600 ml-2"> the first images will be the cover 

                </span>
            </p>
            <div className="flex gap-4">
                <input className="p-3 border-gray-500 bg-white rounded-lg w-full " type="file" id='images' accept="images/*
                multiple" />
                <button className="p-3 text-white cursor-pointer bg-green-700 border-green-600 uppercase rounded hover:shadow-lg 
                  disabled:opacity-80">
                    upload
                </button>
            </div>
            <button className="p-3 bg-slate-900 text-white 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-95">create listing</button>
   
        </div>

        
      </form>
    </main>
  );
}

export default Createlisting;
