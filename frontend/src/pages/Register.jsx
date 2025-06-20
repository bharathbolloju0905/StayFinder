// RegisterPage.jsx
import React,{useState} from "react";
import { Link } from "react-router-dom";
import  useRegister  from "../hooks/useRegister"; 
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [userData,setUserData] = useState({
    fullname:"",
    email:"",
    password:"",
    confirmpassword:"",
    role:""
  })
  const { register, loading } = useRegister();
  const navigate = useNavigate()

  function handleChange(e){
    setUserData({...userData,[e.target.name]:e.target.value})
  }
async function handleSubmit(e){
    e.preventDefault();
    try {
      const data = await register(userData);
      console.log('Registration successful:', data);
      navigate("/home")
    } catch (error) {
      console.error('Registration error:', error);
    }
  }
  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-100">
        <img
          src="https://a0.muscache.com/im/pictures/miso/Hosting-1061361341640122831/original/361ea4e6-a1d4-4c82-bbee-044d108b146f.jpeg?im_w=960
"
          alt="StayFinder"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>

          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe" name="fullname"
                value={userData.fullname} onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com" name="email"
                value={userData.email} onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********" name="password"
                value={userData.password} onChange={handleChange}
              />

            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********" name="confirmpassword"
                value={userData.confirmpassword} onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="role" className="block mb-1 text-sm font-medium">
                Role:
              </label>
              <select
                id="role"
                name="role"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={userData.role} onChange={handleChange}

              >
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="host">Host</option>
              </select>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              {loading? "Creating new Account..." : "Register" }
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
