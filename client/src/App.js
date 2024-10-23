import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import {Routes,Route} from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={
          <PublicRoutes>
          <Register/> 
        </PublicRoutes>
        }/>
        <Route path='/login' element={
          <PublicRoutes>
            <Login/> 
          </PublicRoutes>
        }/>
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage/> 
          </ProtectedRoute>
        }/>
        <Route path='/group/:groupId' element={
          <ProtectedRoute>
            <Dashboard/> 
          </ProtectedRoute>
        }/>
      </Routes>
    </>
  );
}

export default App;
