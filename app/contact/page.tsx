'use client';

import { useState, useEffect } from 'react';
import { useForm } from '@formspree/react';
import { Footer } from "../mainPageComponents/Footer";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xgvavpqq");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Reset form fields after successful submission
  useEffect(() => {
    if (state.succeeded) {
      setName('');
      setEmail('');
      setMessage('');
    }
  }, [state.succeeded]);

  return (
    <div className="min-h-screen bg-white text-gray-100 flex flex-col">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        <h1 className="text-4xl font-bold text-red-500 mb-8">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          <div className="space-y-4">
            <label className="block text-black text-lg mb-0 font-semibold">Name</label>
            <input 
              type="text" 
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-lg text-black"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-black text-lg mb-0 font-semibold">Email</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-lg text-black"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-black text-lg mb-0 font-semibold">Message</label>
            <textarea 
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full p-4 bg-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-lg min-h-[200px] text-black"
              required
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={state.submitting}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg transition-colors w-full text-lg font-medium"
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
          </button>

          {state.succeeded && (
            <p className="text-green-400 text-center mt-6 text-lg">
              Message sent successfully!
            </p>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}