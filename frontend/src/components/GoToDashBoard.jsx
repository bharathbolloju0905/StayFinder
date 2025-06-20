import React from 'react'
import { Link } from 'react-router-dom'

const GoToDashBoard = () => {
return (
    <div className="flex justify-center items-center w-full">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Link to="/dashboard" className="block w-full h-full text-center">
                Go to Dashboard
            </Link>
        </button>
    </div>
)
}

export default GoToDashBoard