import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const requirements = {
  minimum: [
    "Town Hall 13+",
    "Heroes: BK 65+ / AQ 70+ / GW 45+ / RC 25+",
    "Active daily participation",
    "Discord membership required",
    "English communication"
  ],
  preferred: [
    "Town Hall 14-15",
    "Previous war experience",
    "Strong attack strategies knowledge",
    "Ability to 3-star same TH level"
  ]
};

const JoinUs = () => {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Join Team Winter</h1>
        <p className="text-lg text-gray-700 mb-8">
          Looking to join a competitive and friendly Clash of Clans clan? 
          Team Winter might be the perfect fit for you!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              Minimum Requirements
            </h2>
            <ul className="space-y-3">
              {requirements.minimum.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-blue-500 mr-2" />
              Preferred Qualifications
            </h2>
            <ul className="space-y-3">
              {requirements.preferred.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-6 w-6 text-blue-500 mr-2">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">How to Join</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Search for Our Clan</h3>
              <p className="text-gray-700">Clan Tag: #ABC123XYZ</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Send Join Request</h3>
              <p className="text-gray-700">Include your TH level and previous war experience in your request</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Join Our Discord</h3>
              <p className="text-gray-700">You'll receive the Discord invite link upon acceptance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">What We Don't Accept</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Rushed bases",
            "Inactive players",
            "Non-English speakers",
            "Players without Discord"
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2 text-red-600">
              <XCircle className="h-5 w-5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JoinUs;