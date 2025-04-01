import React, { useState } from 'react';
import { useRosterStore } from '../store/rosterStore';
import { Player } from '../types';

const CWLEnrollment = () => {
  const [submitted, setSubmitted] = useState(false);
  const { addPlayer } = useRosterStore();

  const handleEnrollmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      accountName: formData.get('accountName') as string,
      townhallLevel: parseInt(formData.get('townhallLevel') as string),
      previousLeague: formData.get('previousLeague') as string,
      previousStars: parseInt(formData.get('previousStars') as string),
      previousPercentage: parseInt(formData.get('previousPercentage') as string),
      comments: formData.get('comments') as string,
      confirmed: false,
      createdAt: new Date().toISOString(),
    };

    await addPlayer(newPlayer);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Dankje voor het aanmelden</h1>
          <p className="text-lg text-gray-700">
            We hebben je aanmelding ontvangen en zullen deze beoordelen.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">CWL Inschrijving</h1>
        <form className="space-y-6 max-w-md" onSubmit={handleEnrollmentSubmit}>
          <div>
            <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-2">
              Account Naam
            </label>
            <input
              type="text"
              name="accountName"
              id="accountName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="townhallLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Townhall Level
            </label>
            <select
              name="townhallLevel"
              id="townhallLevel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Selecteer Townhall Level</option>
              {[13, 14, 15, 16, 17].map((level) => (
                <option key={level} value={level}>TH {level}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="previousLeague" className="block text-sm font-medium text-gray-700 mb-2">
              Vorige CWL League
            </label>
            <select
              name="previousLeague"
              id="previousLeague"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Selecteer Vorige League</option>
              <option value="Champion 1">Champion 1</option>
              <option value="Champion 2">Champion 2</option>
              <option value="Champion 3">Champion 3</option>
              <option value="Meester 1">Meester 1</option>
              <option value="Meester 2">Meester 2</option>
              <option value="Meester 3">Meester 3</option>
            </select>
          </div>

          <div>
            <label htmlFor="previousStars" className="block text-sm font-medium text-gray-700 mb-2">
              Vorige CWL Sterren (0-21)
            </label>
            <input
              type="number"
              name="previousStars"
              id="previousStars"
              min="0"
              max="21"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="previousPercentage" className="block text-sm font-medium text-gray-700 mb-2">
              Vorige CWL Percentage (0-700)
            </label>
            <input
              type="number"
              name="previousPercentage"
              id="previousPercentage"
              min="0"
              max="700"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
              Opmerkingen (Optioneel)
            </label>
            <textarea
              name="comments"
              id="comments"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Verstuur Inschrijving
          </button>
        </form>
      </section>
    </div>
  );
};

export default CWLEnrollment;