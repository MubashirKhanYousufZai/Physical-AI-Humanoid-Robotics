import Link from "next/link";
import { FaTwitter, FaLinkedinIn, FaRobot, FaGithub } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

export default function Footer() {
  return (
    <footer className="text-gray-700 body-font bg-gray-50 border-t border-gray-200">
      <div className="container px-5 py-8 mx-auto flex flex-col sm:flex-row items-center">

        {/* Logo */}
        <Link href="/" className="flex title-font font-bold items-center md:justify-start justify-center text-gray-900">
          <div className="w-10 h-10 text-white p-2 bg-indigo-600 rounded-full flex items-center justify-center shadow-md">
            <FaRobot className="w-6 h-6" />
          </div>
          <span className="ml-3 text-xl">AI & Robotics Reads</span>
        </Link>

        {/* Copyright */}
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 
          sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2025 — 
          <a
            href="mailto:mubashirmpa2008@gmail.com"
            className="text-indigo-600 ml-1 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            mubashirmpa2008@gmail.com
          </a>
        </p>

        {/* Social Icons */}
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-4">
          <a className="text-gray-500 hover:text-indigo-600 transition" href="https://mubashir-khans-portfolio.vercel.app/">
            <VscAccount className="w-5 h-5" />
          </a>
          <a className="text-gray-500 hover:text-indigo-600 transition" href="https://github.com/MubashirKhanYousufZai">
            <FaGithub className="w-5 h-5" />
          </a>
          <a className="text-gray-500 hover:text-indigo-600 transition" href="https://www.linkedin.com/in/mubashir-khan-538a662bb">
            <FaLinkedinIn className="w-5 h-5" />
          </a>
          <a className="text-gray-500 hover:text-indigo-600 transition" href="https://x.com/MubashirKh67451">
            <FaTwitter className="w-5 h-5" />
          </a>
        </span>

      </div>
    </footer>
  );
}
