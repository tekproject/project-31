import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/login'
import NavBar from './components/navBar';
import UserProfiles from './components/userprofile';
import PrivateRoute from './services/privateRoute';

function App() {
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const interval = (setTimeout(() => setloading(true), 1000)
    )
    return () => clearInterval(interval)
  })

  return (
    <>
      <BrowserRouter>
        <NavBar />
        {loading &&
          <Routes>

            <Route path='/' element={<Login />} />
            <Route
              path="user-profile"
              element={
                <PrivateRoute>
                  {" "}
                  <UserProfiles />{" "}
                </PrivateRoute>
              }
            />




          </Routes>
        }
      </BrowserRouter>


    </>
  );
}

export default App;
