import { Link,useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
import OAuth from "../components/OAuth";
function Signup() {
  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const UsernameElement = useRef();
  const EmailElement = useRef();
  const PasswordElement = useRef();

  const handleSubmit = async (e) => {
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

  // console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          ref={UsernameElement}
        />
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Error during signup'}</p>
    </div>
  );
}

export default Signup;
