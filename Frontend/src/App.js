import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/login'
import NavBar from './components/navBar';
import CreateAttendance from './components/attendance';
import Users from './components/users';
import UserProfiles from './components/userprofile';
import GetStudentDetail from './components/get-student-detail';
import Forbidden from './services/forbidden';
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
            <Route path='create-attendance' element={<CreateAttendance />} />
            <Route path='all-students' element={<Users />} />
            <Route path='user-profile' element={<UserProfiles />} />
            <Route path='get-student-detail' element={<GetStudentDetail />} />
            <Route path="forbidden" element={<Forbidden />} />
            {/* <Route
              path="create-attendance"
              element={
                <PrivateRoute>
                  {" "}
                  <CreateAttendance />{" "}
                </PrivateRoute>
              }
            /> */}

          </Routes>
        }
      </BrowserRouter>


    </>
  );
}

export default App;
