import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Nawy</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <span className="text-white hover:text-gray-300">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/apartments">
              <span className="text-white hover:text-gray-300">Apartments</span>
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar