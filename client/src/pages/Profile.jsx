import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.profilePicture}
          alt="profiel"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Erro Uploading Image (file size must be less than 2 MB)</span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-slate-700">{`uploading: ${imagePercentage}%`}</span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-700">Image Uplaoded Successfully</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          defaultValue={currentUser.name}
          id="username"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="username"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
