"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (You can connect backend later 🚀)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <h1 className="text-4xl font-bold text-purple-700 mb-6">Contact Us</h1> */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow text-black p-6 rounded-lg w-full max-w-md space-y-4" >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-pink-500 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
