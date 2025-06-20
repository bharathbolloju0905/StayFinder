// LoginPage.jsx
import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const { setUser } = useUser();
  const { login, loading } = useLogin();
  const navigate = useNavigate();
  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login(credentials);
      console.log("Login successful:", data);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  }
  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-100">
        <img
          src="https://a0.muscache.com/im/pictures/miso/Hosting-892505638074896029/original/48a02bc4-9e8a-4eb2-89ef-e62094989073.jpeg?im_w=960"
          alt="StayFinder"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Login to StayFinder</h2>

          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com" name="email" onChange={handleChange} value={credentials.email}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********" name="password" onChange={handleChange} value={credentials.password}
              />
            </div>

            <button disabled={loading}
              onClick={handleSubmit}
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
