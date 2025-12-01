import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

function Header() {
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    if (currentUser?.email) {
      window.userEmail = currentUser.email;
      localStorage.setItem('currentUserEmail', currentUser.email)
    }
  }, [currentUser]);

  return (
    <div className='app-header'> 
      <div className='header-content-container'>
        
        {/* Logo/App Name */}
        <h1 className='nav-logo'>
          <Link to={'/'}>NEO-EARTH HQ</Link>
        </h1>
        
        {/* Navigation Links - Thematic Names */}
        <ul className='nav-links-list'>
          {/* Replaced 'Home' with 'ARCHIVE' (Your central hub/data repository) */}
          <Link to={'/'}><li className='nav-item'>Archive</li></Link> 
          
          {/* Replaced 'About' with 'MANIFEST' (Details about the system/mission) */}
          <Link to={'/about'}><li className='nav-item'>Manifest</li></Link> 
          
          {/* Added a new thematic link for user interaction */}
          <Link to={'/comms'}><li className='nav-item'>Comms Log</li></Link> 

          <Link to={'/diagnostics'}><li className='nav-item' style={{color: '#ff0077'}}>DIAGNOSTICS</li></Link>

          <Link to={'/aiv'}><li className='nav-item' style={{color: '#00ff41', fontWeight: 'bold'}}>AIV.VALIDATE</li></Link>
          
          {/* Profile/Sign In Link */}
          <Link to={'/profile'} className='profile-link'>
            {currentUser ?
              (<img src={currentUser.profilePicture} alt="profile" className='profile-image' />)
              :
              (<li className='nav-item nav-signin-btn'>Access Console</li>)
            }
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
