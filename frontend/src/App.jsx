import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import RegisterPage from './pages/Register'
import DetailsPage from './pages/DetailsPage'
import BookingConfirmation from './pages/ConfirmationPage'
import ProtectedRoute from './components/ProtectedRoute'
import HostDashboard from './pages/HostDashBoard'
import CreateListingForm from './components/CreateListingForm'
import EditListingForm from './components/EditListingForm'

function App() {
  

  return (
  
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/confirmation-page" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
        <Route path="/dashboard" element={<HostDashboard />}/>
        <Route path="/host/add-listing" element={<CreateListingForm />}/>
        <Route path="/host/edit-listing/:id" element={<EditListingForm />} />
      </Routes>
   
  )
}

export default App
