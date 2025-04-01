import React from 'react';

const About = () => {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">About Team Winter</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-4">
            Team Winter is a competitive Clash of Clans clan founded in 2021 with a focus on strategic gameplay 
            and community building. Our clan has quickly risen through the ranks to establish itself as a 
            formidable presence in Clan War Leagues.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Strategic Excellence - We prioritize well-planned attacks and continuous improvement</li>
            <li>Active Participation - Regular involvement in wars and clan activities is essential</li>
            <li>Respectful Community - Maintaining a positive and supportive environment for all members</li>
            <li>Knowledge Sharing - Experienced players helping others improve their skills</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Clan Rules</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Use both attacks in regular wars</li>
            <li>Maintain a minimum donation ratio of 1:3</li>
            <li>Participate in clan games</li>
            <li>Follow attack assignments in CWL</li>
            <li>Maintain active status (inactive for 7+ days without notice may result in removal)</li>
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">War Strategy Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Attack Principles</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Always scout your target before attacking</li>
              <li>Use your first attack within 12 hours</li>
              <li>Save second attacks for cleanup</li>
              <li>Follow the war plan and assignments</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">War Preparation</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Opt out if heroes are upgrading</li>
              <li>Maintain war army compositions</li>
              <li>Keep clan castle troops requested</li>
              <li>Review recent war performance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;