import { Link,useNavigate } from "react-router-dom";
import { useRef } from "react";
import { signInFailure,signInStart,signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import './Home.css'; // Ensure you import a file containing .content-body-dark and .form-input-neon

function Signin() {
  const {loading,error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispacth = useDispatch();

  const EmailElement = useRef();
  const PasswordElement = useRef();

  const handleSubmit = async (e) => {
    // ... (Functionality remains unchanged)
    e.preventDefault();
    const email = EmailElement.current.value;
    const password = PasswordElement.current.value;
    const newuser = { email, password };


    try {
      dispacth(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newuser),
      });

      const data = await res.json();
      EmailElement.current.value = '';
      PasswordElement.current.value = '';

      if(data.success===false){
        dispacth(signInFailure(data));
        return;
      }
      dispacth(signInSuccess(data));
      navigate('/')
    }
      catch (error) {
      dispacth(signInFailure(error));
    }
  };

  return (
    // Apply dark background and center alignment
    <div className="content-body-dark flex justify-center items-center py-12">
        <div className="max-w-md w-full p-8 auth-terminal-box">
            <h1 className="text-3xl text-center font-bold mb-8" style={{ color: '#00ff41', textShadow: '0 0 5px #00ff41' }}>
                ACCESS CONSOLE
            </h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Sector Email / User ID"
                    id="email"
                    className="form-input-neon" // Custom class for neon input style
                    ref={EmailElement}
                />
                <input
                    type="password"
                    placeholder="Authorization Key (Password)"
                    id="password"
                    className="form-input-neon"
                    ref={PasswordElement}
                />
                <button disabled={loading} className="auth-button-primary">
                    {loading ? 'Processing...' : 'ACTIVATE SESSION'}
                </button>
                {/* Assuming OAuth is styled internally, keeping it here */}
                <OAuth/> 
            </form>
            
            <div className="flex justify-center gap-2 mt-6 text-sm" style={{ color: '#ccc', fontFamily: 'Share Tech Mono' }}>
                <p>Auth Protocol Failed?</p>
                <Link to="/signup">
                    <span className="auth-link-neon">Request New Key</span>
                </Link>
            </div>
            
            <p className='mt-5 text-center' style={{ color: '#ff0077', fontFamily: 'Share Tech Mono' }}>
                {error ? error.message || 'Transmission Error! Check credentials.' : ''}
            </p>
        </div>
    </div>
  );
}

export default Signin;
