"use client";

export const Footer = () => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    return (
      <footer className="bg-gray-900 text-gray-300 py-12 mt-24 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Branding */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-red-500">Habit Flow</h3>
              <p className="text-base text-gray-400">Build Better Habits</p>
            </div>
  
            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-400">Navigation</h4>
              <nav className="flex flex-col space-y-2">
                <a href="/">
                <button 
                  onClick={scrollToTop}
                  className="text-base hover:text-red-400 transition-colors text-left"
                >
                  Home
                </button></a>
                <a href="/about" className="text-base hover:text-red-400 transition-colors">
                  About
                </a>
                <a href="/contact" className="text-base hover:text-red-400 transition-colors">
                  Contact
                </a>
              </nav>
            </div>
  
            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-400">Legal</h4>
              <nav className="flex flex-col space-y-2">
                <a href="/terms" className="text-base hover:text-red-400 transition-colors">
                  Terms of Service
                </a>
                <a href="/privacy" className="text-base hover:text-red-400 transition-colors">
                  Privacy Policy
                </a>
              </nav>
            </div>
  
            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-400">Connect</h4>
              <div className="flex space-x-6">
              <a href="https://x.com/NiyaZ_ZernE" target="_blank" className="text-gray-400 hover:text-red-400">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="https://github.com/Niyaz-0" target="_blank" className="text-gray-400 hover:text-red-400">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-base text-gray-400">
              &copy; {new Date().getFullYear()} Habit Flow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };