import React from 'react';
import { Shield, Star, Trophy, MessageCircle } from 'lucide-react';

const leaders = [
  {
    name: "FrostKing",
    role: "Leader",
    townhall: 15,
    discord: "FrostKing#1234",
    bio: "Founding member of Team Winter. Expert in ground attacks and war strategy planning.",
    icon: Shield
  },
  {
    name: "IceQueen",
    role: "Co-Leader",
    townhall: 15,
    discord: "IceQueen#5678",
    bio: "CWL coordinator and air attack specialist. Manages clan recruitment and member development.",
    icon: Star
  },
  {
    name: "SnowWarrior",
    role: "Co-Leader",
    townhall: 14,
    discord: "SnowWarrior#9012",
    bio: "War base designer and defensive specialist. Leads clan games coordination.",
    icon: Trophy
  },
  {
    name: "BlizzardMaster",
    role: "Elder",
    townhall: 14,
    discord: "BlizzardMaster#3456",
    bio: "Donation leader and hybrid attack expert. Helps with new member orientation.",
    icon: MessageCircle
  }
];

const Leadership = () => {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Our Leadership Team</h1>
        <p className="text-lg text-gray-700 mb-8">
          Meet the dedicated team that keeps Team Winter running smoothly and successfully.
          Our leaders are here to help you grow and succeed in the clan.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leaders.map((leader) => {
            const Icon = leader.icon;
            return (
              <div key={leader.name} className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 rounded-full p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{leader.name}</h3>
                    <div className="text-blue-600 font-medium">{leader.role}</div>
                    <div className="text-sm text-gray-600 mt-1">TH {leader.townhall}</div>
                    <p className="text-gray-700 mt-3">{leader.bio}</p>
                    <div className="mt-4 text-sm text-gray-600">
                      Discord: {leader.discord}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Leadership Responsibilities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">War Management</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>War strategy development</li>
              <li>Base assignment coordination</li>
              <li>Attack timing management</li>
              <li>Performance review and feedback</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Clan Development</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Member recruitment and screening</li>
              <li>Activity monitoring</li>
              <li>Donation oversight</li>
              <li>Conflict resolution</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;