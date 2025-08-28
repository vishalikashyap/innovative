"use client";

import { useState } from "react";
import Link from "next/link";
import AboutPage from "./about/page";
import BlogPage from "./blog/page";
import ContactPage from "./contact/page";
import LoginPage from "../login/login"; // import login component
import SignupPage from "../signup/signup"; // import signup component

export default function GuestDashboard() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans relative">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="font-bold text-2xl italic text-black">I&F</div>
          <nav className="flex gap-6 items-center text-lg">
            <Link href="#blog" className="text-gray-700 hover:text-pink-500 transition">BLOG</Link>
            <Link href="#about" className="text-gray-700 hover:text-pink-500 transition">ABOUT</Link>
            <Link href="#contact" className="text-gray-700 hover:text-pink-500 transition">CONTACT</Link>

            <button
              onClick={() => setShowLogin(true)}
              className="bg-yellow-300 px-5 py-2 rounded font-bold text-gray-900 hover:bg-yellow-400 transition"
            >
              LOGIN
            </button>

            {/* <button
              onClick={() => setShowSignup(true)}
              className="bg-purple-800 text-white px-5 py-2 rounded font-bold hover:bg-pink-600 transition"
            >
              SIGN UP
            </button> */}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-75"
          style={{ backgroundImage: "url('/project1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/70 to-purple-700/70"></div>
        <div className="relative z-10 flex flex-col items-center px-6 animate-fadeIn">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            INNOVATIVE & FRESH
          </h1>
          <p className="text-white text-lg md:text-2xl mb-6 max-w-2xl">
            Explore creative ideas, read our latest blogs, and connect with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#about"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-700 transition"
            >
              LEARN MORE
            </a>
            <button
              onClick={() => setShowSignup(true)}
              className="bg-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition"
            >
              SIGN UP NOW
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Our Blog</h2>
          <BlogPage />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-yellow-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">About Us</h2>
          <AboutPage />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-yellow-200 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Contact Us</h2>
          <ContactPage />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-6 text-center space-y-2">
          <p>&copy; {new Date().getFullYear()} I&F. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-pink-500 transition">Facebook</a>
            <a href="#" className="hover:text-pink-500 transition">Twitter</a>
            <a href="#" className="hover:text-pink-500 transition">Instagram</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-2xl font-bold"
            >
              &times;
            </button>
            <LoginPage />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        
            <SignupPage onClose={() => setShowSignup(false)} />
          </div>
        
      )}
    </div>
  );
}
