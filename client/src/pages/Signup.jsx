import { Link,useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
import OAuth from "../components/OAuth";
import '../Home.css'; // Ensure you import a file containing .content-body-dark and .form-input-neon

function Signup() {
  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const UsernameElement = useRef();
  const EmailElement = useRef();
  const PasswordElement = useRef();

  const handleSubmit = async (e) => {
    // ... (Functionality remains unchanged)
    e.preventDefault();
    const name = UsernameElement.current.value;
    const email = EmailElement.current.value;
    const password = PasswordElement.current.value;

    const newuser = { name, email, password };


    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newuser),
      });
      const data = await res.json();
      setLoading(false)

      UsernameElement.current.value = "";
      EmailElement.current.value = '';
      PasswordElement.current.value = '';

      if(data.success===false){
        setError(true)
        return;
      }
      navigate('/signin')
    } catch (error) {
      setLoading(false)
    }
  };

  return (
    // Apply dark background and center alignment
    <div className="content-body-dark flex justify-center items-center py-12">
        <div className="max-w-md w-full p-8 auth-terminal-box">
            <h1 className="text-3xl text-center font-bold mb-8" style={{ color: '#00ff41', textShadow: '0 0 5px #00ff41' }}>
                NEW KEY REQUEST
            </h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Designated Code Name (Username)"
                    id="username"
                    className="form-input-neon"
                    ref={UsernameElement}
                />
                <input
                    type="email"
                    placeholder="Validated Recovery Email"
                    id="email"
                    className="form-input-neon"
                    ref={EmailElement}
                />
                <input
                    type="password"
                    placeholder="New Authorization Key (Password)"
                    id="password"
                    className="form-input-neon"
                    ref={PasswordElement}
                />
                <button disabled={loading} className="auth-button-primary">
                    {loading ? 'Initiating...' : 'TRANSMIT REQUEST'}
                </button>
                <OAuth/>
            </form>
            
            <div className="flex justify-center gap-2 mt-6 text-sm" style={{ color: '#ccc', fontFamily: 'Share Tech Mono' }}>
                <p>Key Already Available?</p>
                <Link to="/signin">
                    <span className="auth-link-neon">Access Console</span>
                </Link>
            </div>
            
            <p className="mt-5 text-center" style={{ color: '#ff0077', fontFamily: 'Share Tech Mono' }}>
                {error && 'ERROR: Request protocol failed.'}
            </p>
        </div>
    </div>
  );
}

export default Signup;
