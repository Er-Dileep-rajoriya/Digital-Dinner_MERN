
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        {/* Left Side: Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold tracking-tight mb-1">Digital Dinner 🍽️</h3>
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center: Navigation */}
        <div className="flex gap-4 flex-wrap justify-center">
          <a href="#" className="hover:text-cyan-400 transition">Menu</a>
          <a href="#" className="hover:text-cyan-400 transition">Cart</a>
          <a href="#" className="hover:text-cyan-400 transition">Orders</a>
          <a href="#" className="hover:text-cyan-400 transition">Contact</a>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-gray-300 transition">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
