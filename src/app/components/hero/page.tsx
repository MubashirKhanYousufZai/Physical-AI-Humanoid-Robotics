import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="text-gray-800 body-font">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-5 py-24 md:py-32">
        {/* Text Content */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            AI & Humanoid Robotics:
            <br className="hidden lg:block" />A Short Course Primer
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-lg leading-relaxed">
            Course Level: Introductory / Intermediate
            <br />
            Duration: 4-6 Weeks
            <br />
            Prerequisites: Python basics, Linear Algebra, and Calculus
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              <a href="/components/about">Learn More</a>
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition duration-300">
              <a href="/components/chapters">Preview Syllabus</a>
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-end">
          <div className="relative w-72 h-96 sm:w-96 sm:h-[28rem] lg:w-[28rem] lg:h-[36rem]">
            <Image
              src="/hero.png"
              alt="AI & Humanoid Robotics Book Cover"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
