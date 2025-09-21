import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          {/* PNG Logo */}
          <div className="w-12 h-12">
            <img
              src="src/ym_logo.png" // replace with your PNG path
              alt="Yours Media Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">Yours Media</h1>
            <p className="text-sm text-slate-500">మికు నచ్చిన మేమిచిన వీడియోస్ అందించడంమే మా గోల్</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <a href="https://www.youtube.com/@yoursmediaofficial">
            <button className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition">
              Explore Videos
            </button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg bg-white shadow-md">
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
