import React from 'react';
import { Link } from 'react-router-dom';
import { Snowflake } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Snowflake className="h-8 w-8 text-blue-300" />
            <span className="text-xl font-bold">Team Winter</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-300 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-300 transition">About</Link>
            <Link to="/leadership" className="hover:text-blue-300 transition">Leadership</Link>
            <Link to="/cwl-enrollment" className="hover:text-blue-300 transition">CWL Enrollment</Link>
            <Link to="/gallery" className="hover:text-blue-300 transition">Gallery</Link>
            <Link to="/join-us" className="hover:text-blue-300 transition">Join Us</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/admin" 
              className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;