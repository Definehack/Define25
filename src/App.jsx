import './App.css'
import Login from './components/Login';
import SignUp from './components/SignUp'
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App
