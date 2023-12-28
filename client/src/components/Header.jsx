import React from 'react'
import {Link} from 'react-router-dom';
function Header() {
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center mx-10 p-5 '>
        <h1 className='font-bold'><Link to={'/'}>MY APP</Link></h1>
        <ul className='flex gap-4'>
            <li>  <Link to={'/'}>Home</Link></li>
            <li>  <Link to={'/about'}>About</Link></li>
            <li>  <Link to={'/signin'}>Signin</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Header

