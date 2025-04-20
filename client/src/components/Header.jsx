import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
function Header() {
  const {currentUser} = useSelector(state => state.user) 

   useEffect(() => {
    if (currentUser?.email) {
      window.userEmail = currentUser.email;
    }
  }, [currentUser]);
  
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
        <h1 className='font-bold'><Link to={'/'}>MY APP</Link></h1>
        <ul className='flex gap-4'>
           <Link to={'/'}><li>Home</li></Link>
             <Link to={'/about'}><li>About</li></Link>
           <Link to = {'/profile'}>
            {currentUser ? 
            (<img src={currentUser.profilePicture} alt="profile" className='h-8 w-8 rounded-full object-cover'/>):(<li>SignIn</li>)
            }
            </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header

