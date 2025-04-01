import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Team Winter</h3>
            <p className="text-blue-300">
              Een vooraanstaande Clash of Clans clan gericht op competitief gameplay en gemeenschap.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Snelle Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-blue-300 hover:text-white transition">Over Ons</a></li>
              <li><a href="/cwl-enrollment" className="text-blue-300 hover:text-white transition">CWL Inschrijving</a></li>
              <li><a href="/join-us" className="text-blue-300 hover:text-white transition">Word Lid</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Volg Ons</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white transition">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
          <p>&copy; {new Date().getFullYear()} Team Winter. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;