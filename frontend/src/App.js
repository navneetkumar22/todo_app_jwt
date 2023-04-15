import './App.css';
import './TaskStyle.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';
// import Tasks from './components/Tasks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/tasks' element={<Tasks />} /> */}
      </Routes>
    </BrowserRouter>
  )
};

export default App;