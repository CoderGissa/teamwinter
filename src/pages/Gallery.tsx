import React from 'react';
import { Play, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const warReplays = [
    {
      title: "Perfect War Attack - TH15 QC Hybrid",
      description: "3-star attack against a max TH15 base",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      type: "video"
    },
    {
      title: "CWL Winning Defense",
      description: "Crucial defense that secured our victory",
      thumbnail: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=800",
      type: "video"
    }
  ];

  const screenshots = [
    {
      title: "War Win Streak",
      description: "10 wars won in a row!",
      image: "https://images.unsplash.com/photo-1542751371-6533d324d67f?auto=format&fit=crop&q=80&w=800",
      type: "image"
    },
    {
      title: "Clan Games Maximum Points",
      description: "Team Winter maxing clan games again",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=800",
      type: "image"
    }
  ];

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">War Replays</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {warReplays.map((replay, index) => (
            <div key={index} className="group relative rounded-lg overflow-hidden">
              <img
                src={replay.thumbnail}
                alt={replay.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Play className="h-12 w-12 text-white" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{replay.title}</h3>
                <p className="text-gray-600">{replay.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6">Screenshots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="group relative rounded-lg overflow-hidden">
              <img
                src={screenshot.image}
                alt={screenshot.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <ImageIcon className="h-12 w-12 text-white" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{screenshot.title}</h3>
                <p className="text-gray-600">{screenshot.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;