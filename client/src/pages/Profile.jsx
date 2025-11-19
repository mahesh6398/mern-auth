import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {signOut, deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure,updateUserStart,updateUserSuccess } from "../redux/user/userSlice";
import './Home.css'; // Ensure custom styles are imported

function Profile() {
  const { currentUser ,loading, error} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  // ... (All functions remain UNCHANGED) ...
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

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    }catch(err){
      dispatch(updateUserFailure(err));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async()=>{
    try{
      await fetch('/api/auth/signout/');
      dispatch(signOut());
    }catch(error){
      console.log(error);
    }
  }
  // ... (All functions remain UNCHANGED) ...
  
  return (
    // Apply dark body and central terminal box styling
    <div className="content-body-dark flex justify-center py-12" id="Profile">
        <div className="max-w-lg w-full p-8 auth-terminal-box">
            
            <h1 className="text-3xl font-bold text-center mb-7" style={{ color: '#ff0077', textShadow: '0 0 5px #ff0077' }}>
                SECTOR ACCESS TERMINAL
            </h1>
            
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                
                {/* Profile Image (Clickable to change) */}
                <img
                    onClick={() => fileRef.current.click()}
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="profile"
                    // Use custom class for neon border on image
                    className="h-24 w-24 self-center cursor-pointer object-cover mt-2 profile-image-neon" 
                />
                
                {/* Image Upload Status Message */}
                <p className="text-sm self-center" style={{ fontFamily: 'Share Tech Mono' }}>
                    {imageError ? (
                        <span style={{ color: '#ff0077' }}>ERROR: File integrity compromised (Max 2MB)</span>
                    ) : imagePercentage > 0 && imagePercentage < 100 ? (
                        <span style={{ color: '#00ff41' }}>{`TRANSMITTING: ${imagePercentage}%`}</span>
                    ) : imagePercentage === 100 ? (
                        <span style={{ color: '#ff0077' }}>Identity confirmed.</span>
                    ) : (
                        ""
                    )}
                </p>

                {/* Input Fields */}
                <input
                    type="text"
                    defaultValue={currentUser.name}
                    id="name"
                    className="form-input-neon" // Custom class for neon input style
                    placeholder="Sector ID (Username)"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    defaultValue={currentUser.email}
                    id="email"
                    className="form-input-neon"
                    placeholder="Encrypted Channel Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id="password"
                    className="form-input-neon"
                    placeholder="New Authorization Key (Password)"
                    onChange={handleChange}
                />
                
                {/* Update Button */}
                <button disabled={loading} className="auth-button-primary">
                    {loading ? 'INITIATING UPDATE...' : 'UPDATE CREDENTIALS'}
                </button>
            </form>
            
            {/* Action Links */}
            <div className="flex justify-between mt-5" style={{ fontFamily: 'Share Tech Mono' }}>
                <span className="auth-link-neon" style={{ color: '#ff0077' }} onClick={handleDeleteAccount}>
                    [TERMINATE ACCESS]
                </span>
                <span className="auth-link-neon" onClick={handleSignOut}>
                    [SIGN OUT]
                </span>
            </div>
            
            {/* Status Messages */}
            <p className="mt-5 text-center" style={{ color: '#ff0077', fontFamily: 'Share Tech Mono' }}> 
                {error && "Error: Update protocol failed."}
            </p>
            <p className="text-center" style={{ color: '#00ff41', fontFamily: 'Share Tech Mono' }}> 
                {updateSuccess && "STATUS: Credentials updated successfully!"}
            </p>
        </div>
    </div>
  );
}

export default Profile;
