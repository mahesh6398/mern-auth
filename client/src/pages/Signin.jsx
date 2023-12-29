import { Link,useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
function Signin() {
  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const EmailElement = useRef();
  const PasswordElement = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = EmailElement.current.value;
    const password = PasswordElement.current.value;

    const newuser = { email, password };


    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newuser),
      });
      const data = await res.json();
      setLoading(false)

      EmailElement.current.value = '';
      PasswordElement.current.value = '';

      if(data.success===false){
        setError(true)
        return;
      }
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.error("Error during signup:", error);
    }
  };

  // console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          ref={EmailElement}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          ref={PasswordElement}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an Account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Error during signup'}</p>
    </div>
  );
}

export default Signin;
