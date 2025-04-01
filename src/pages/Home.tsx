import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section 
        className="relative h-[500px] rounded-2xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welkom bij Team Winter
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl">
              De beste clan van Nederland 🇳🇱 🏆
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/join-us"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Join onze clan
              </Link>
              <Link
                to="/cwl-enrollment"
                className="bg-white hover:bg-blue-50 text-blue-900 px-8 py-3 rounded-lg font-semibold transition"
              >
                CWL Inschrijving
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">War Overwinningen</h3>
          <p className="text-3xl font-bold text-blue-900">250+</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Actieve Leden</h3>
          <p className="text-3xl font-bold text-blue-900">250+</p>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Laatste Nieuws</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold">CWL Seizoen Start Binnenkort!</h3>
            <p className="text-gray-600">Inschrijving voor het volgende CWL seizoen is nu geopend. Vergeet je niet in te schrijven!</p>
            <p className="text-sm text-gray-500 mt-1">2 dagen geleden</p>
          </div>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold">Nieuwe War Strategie Guide</h3>
            <p className="text-gray-600">Bekijk onze bijgewerkte war strategie guide voor TH15 aanvallen.</p>
            <p className="text-sm text-gray-500 mt-1">5 dagen geleden</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;