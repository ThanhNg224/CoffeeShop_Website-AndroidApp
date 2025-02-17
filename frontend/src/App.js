import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './AdminPage/Admin';
import Login from './Login';
import User from './UserPage/User';
import AboutUs from './UserPage/Pages/AboutUs';
import Contact from './UserPage/Pages/Contact';
import ProductDetails from './UserPage/Pages/ProductDetails';
import PageViewTracker from './AdminPage/PageViewTracker';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <PageViewTracker />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />
            <Route path='/user/:id' element={<PrivateRoute><User /></PrivateRoute>} />
            <Route path='/menu/:id' element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
            <Route path='/user/:id/info' element={<PrivateRoute><AboutUs /></PrivateRoute>} />
            <Route path='/user/:id/contact' element={<PrivateRoute><Contact /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
