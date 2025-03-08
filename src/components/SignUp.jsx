import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/SignUp.css';
import sample from '../assets/sample.jpg'

const SignUp = () => {
//   const { theme } = useTheme();
  return (
    <>
   <div className='topic'>
   <h1>
   sample
    </h1>
    <h1>
    sample
    </h1>
   </div>
   <div className='main-sig'>
    <div className='leftt'>
      

     
      <img src={sample} alt='sample' className='sample'></img>
      

    </div>
    <div className='rightt'>
    <div className={`signup-container`}>
      <h2>Sign Up</h2>
      <form>
        <input className='username' type="text" placeholder="Name" required />
        <input className='email' type="email" placeholder="Email" required />
        <input className='password' type="password" placeholder="Password" required />
        <button className='submit' type="submit"> <Link to="/expenses" className='sign-link'> Sign Up</Link> </button>
      </form>
      <p className='s'>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
   </div>
    </>
  );
};

export default SignUp;
