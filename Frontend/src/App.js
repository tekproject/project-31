import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/login'
import NavBar from './components/navBar';
import Attendance from './components/attendance';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='create-attendance' element={<Attendance />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
