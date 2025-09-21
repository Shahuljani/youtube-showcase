import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t text-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo & Description */}
{/* Logo Section */}
<div className="flex items-center gap-3">
  {/* PNG Logo */}
  <div className="w-12 h-12">
    <img
      src="src\ym_logo.png" // replace with your PNG path
      alt="Yours Media Logo"
      className="w-full h-full object-contain"
    />
  </div>

  <div>
    <h1 className="text-xl font-bold text-slate-900">Yours Media</h1>
    <p className="text-sm text-slate-500">మికు నచ్చిన మేమిచిన వీడియోస్ అందించడంమే మా గోల్</p>
  </div>
</div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-brand-600 transition-colors">Home</a></li>
            <li><a href="https://www.youtube.com/@yoursmediaofficial/videos" className="hover:text-brand-600 transition-colors">Videos</a></li>
            <li><a href="https://www.youtube.com/@yoursmediaofficial/" className="hover:text-brand-600 transition-colors">About</a></li>
            <li><a href="https://www.instagram.com/yoursmediaofficial/" className="hover:text-brand-600 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/yoursmediaofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Instagram</a>
            <a href="https://www.youtube.com/@yoursmediaofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">YouTube</a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:yoursmaheshyt@gmail.com" className="hover:text-brand-600 transition-colors">yoursmaheshyt@gmail.com</a></li>
            <li>Phone: <a href="7901024693" className="hover:text-brand-600 transition-colors">7901024693</a></li>
            <li>Location: <span className="text-slate-500">India</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t mt-10 pt-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Designed & Developed by Yours Media Editor. Made with ❤️ towards Yours Media
      </div>
    </footer>
  );
}
