import React,{useState} from 'react'
import { useUser } from '../context/UserContext'


const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useUser()

  const login = async (credentials) => {
    setLoading(true)
    const validationError = validateCredentials(credentials);
    if (validationError) {
      setLoading(false)
      throw new Error(validationError);
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      setUser(data.user)
      return data;
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { login, loading }
}

export default useLogin ;

function validateCredentials(credentials) {
  const { email, password } = credentials;
  if (!email || !password) {
    return "Email and password are required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
}