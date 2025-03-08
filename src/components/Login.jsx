import { Link } from 'react-router-dom';
import '../styles/Login.css';
import sample from '../assets/sample.jpg'


const Login = () => {

//   const {theme} = useTheme();
  return (
    <>
    <div className='topic'>
   <h2>
      sample
    </h2>
    <h2>
    sample
    </h2>
   </div>

   <div className='main-log'>
    <div className='left'>

          <img src={sample} alt='sample' className='sample'></img>
    


    </div>
    <div className='right'>
    <div className={`login-container`}>
      <h2>Login</h2>
      <form>
        <input className='user' type="email" placeholder="Email" required />
        <input className='pass' type="password" placeholder="Password" required />
        <button className='sub' type="submit">Login</button>
      </form>
      <p className='l'>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      
    </div>

    </div>
   </div>
    </>
  );
};

export default Login;
