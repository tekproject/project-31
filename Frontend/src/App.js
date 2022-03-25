import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { LoginContainer } from './container/login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginContainer />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
