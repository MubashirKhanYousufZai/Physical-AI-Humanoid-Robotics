"use client";

import Link from "next/link";
import { FaRobot } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";

export default function Header() {
  return (
    <header className="text-gray-800 body-font shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex title-font font-bold items-center text-gray-900 mb-4 md:mb-0 hover:text-indigo-600 transition-colors duration-300"
        >
          <div className="w-10 h-10 bg-indigo-600 text-white p-2 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300">
            <FaRobot className="w-6 h-6" />
          </div>
          <span className="ml-3 text-2xl md:text-3xl">AI & Robotics Reads</span>
        </Link>

        {/* Navigation */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center space-x-6">
          <Link
            href="/"
            className="hover:text-indigo-600 font-medium transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/components/about"
            className="hover:text-indigo-600 font-medium transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/components/chapters"
            className="hover:text-indigo-600 font-medium transition-colors duration-300"
          >
            Chapters
          </Link>
          <Link
            href="/components/author"
            className="hover:text-indigo-600 font-medium transition-colors duration-300"
          >
            Author
          </Link>
        </nav>

        {/* Call to Action */}
        <Link
          href="/components/contact"
          className="inline-flex items-center bg-indigo-600 text-white border-0 py-2 px-5 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Contact
          <IoIosContact className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </header>
  );
}
