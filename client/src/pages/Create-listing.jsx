import React, { useState } from "react";
import {useSelector} from 'react-redux'
import{useNavigate} from 'react-router-dom'
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
// Replace these with your own Cloudinary values (see setup steps below)

function Createlisting() {
  const navigate = useNavigate()
  const {currentUser}=useSelector(state=>state.user)
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [error,setError]=useState(false)
  const[loading,setLoading]=useState(false)
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);

  const handleImgSubmit = (e) => {
    e.preventDefault();
    setImageUploadError(false);
    if (files.length > 0 && files.length < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setImageUploadError("Image upload failed (max 2mb per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload up to 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const result = await res.json();
    return result.secure_url;
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try{
      if(formData.imageUrls.length<1)return setError('you must upload at least 1 image')
      if(+formData.regularPrice<+formData.discountedPrice) return setError('regular price must be higher than discounted')
      setLoading(true)
      setError(false)
      const res = await fetch('/api/listing/create',{
        method:'POST',
        credentials: 'include', 
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          ...formData,
        userRef:currentUser._id})
      })
      const data = await res.json()
      setLoading(false)
      if(data.success === false){
        setError(error.message)
        setLoading(false)
      }
      navigate(`/listing/${data._id}`)

    }catch(error){
      setError(error.message)
      setLoading(false)

    }

  }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center uppercase text-3xl font-semibold my-7">
        create a listing
      </h1>
      <form onSubmit={handleSubmit} action="" className="mt-5 flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg bg-white"
            id="name"
            maxLength="64"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />

          <input
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg bg-white"
            id="description"
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg bg-white"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="mt-5 flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
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
                onChange={handleChange}
                checked={formData.bedrooms}
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
                onChange={handleChange}
                checked={formData.bathrooms}
              />
              <span>bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularprice"
                min="50"
                max="1000000"
                className="bg-white p-2 border border-gray-500 rounded-lg"
                onChange={handleChange}
                checked={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <span>regular price</span>
                <span className="text-xs">$ / month</span>
              </div>
            </div>
            {formData.offer && 
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedprice"
                min="0"
                max="10000"
                className="bg-white p-2 border border-gray-500 rounded-lg"
                onChange={handleChange}
                checked={formData.discountedPrice}
              />
              <div className="flex flex-col items-center">
                <span>discounted price</span>
                <span className="text-xs">$ / month</span>
              </div>
            </div>}
          </div>
        </div>

        <div className="flex gap-4 flex-1 flex-col ml-15">
          <p className="font-semibold">
            images:
            <span className="font-normal text-gray-600 ml-2">
              the first image will be the cover
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border-gray-500 bg-white rounded-lg w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImgSubmit}
              className="p-3 text-white cursor-pointer bg-green-700 border-green-600 uppercase rounded hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "upload"}
            </button>
          </div>

          {imageUploadError && (
            <p className="text-red-700 text-sm">{imageUploadError}</p>
          )}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 cursor-pointer uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}

          <button disabled={loading || uploading } className="p-3 bg-slate-900 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-95">
            {loading ? 'creating ': 'create listing'}
          </button>
          {error && <p className="text-red-800 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default Createlisting;
