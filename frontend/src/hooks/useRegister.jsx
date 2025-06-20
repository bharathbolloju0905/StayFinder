import React ,{useState}from 'react'
import {useUser} from '../context/UserContext'

const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useUser()

  const register = async (userData) => {
    setLoading(true)
    const validationError = validateCredentials(userData);
    if (validationError) {
      setLoading(false)
      throw new Error(validationError);
    }

    try {
        console.log('Registering user:', userData)
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      setUser(data.user)
      return data;
    } catch (error) {
      console.error('Error during registration:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }
    return { register, loading }
}

export default useRegister ;


function validateCredentials(userData) {
  const { fullname, email, password, confirmpassword, role } = userData;
  if (!fullname || !email || !password || !confirmpassword || !role) {
    return "All fields are required";
  }
  if (password !== confirmpassword) {
    return "Passwords do not match";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
}