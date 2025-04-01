import React, { useState, useEffect } from 'react';
import { Plus, X, Users, Star, Trophy } from 'lucide-react';
import { useRosterStore } from '../store/rosterStore';
import { Player } from '../types';

interface Clan {
  id: string;
  name: string;
  league: string;
  players: Player[];
}

const LEAGUES = ['Champion 1', 'Champion 2', 'Champion 3', 'Meester 1', 'Meester 2', 'Meester 3'];

const AdminDashboard = () => {
  const [showCWLSetup, setShowCWLSetup] = useState(false);
  const [clans, setClans] = useState<Clan[]>([]);
  const [newClanName, setNewClanName] = useState('');
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);
  const { roster, fetchRoster, loading, error } = useRosterStore();

  useEffect(() => {
    fetchRoster();
  }, [fetchRoster]);

  const handleCreateClan = () => {
    if (newClanName.trim()) {
      setClans([...clans, {
        id: crypto.randomUUID(),
        name: newClanName,
        league: selectedLeague,
        players: []
      }]);
      setNewClanName('');
    }
  };

  const handlePlayerDoubleClick = (player: Player) => {
    // Check if player is already in any clan
    const isPlayerInClan = clans.some(clan => 
      clan.players.some(p => p.id === player.id)
    );

    if (isPlayerInClan) {
      return; // Don't add if player is already in a clan
    }

    // Find Team Winter 1 clan or create it if it doesn't exist
    let teamWinter1 = clans.find(clan => clan.name === 'Team Winter 1');
    let updatedClans = [...clans];
    
    if (!teamWinter1) {
      teamWinter1 = {
        id: crypto.randomUUID(),
        name: 'Team Winter 1',
        league: 'Champion 1',
        players: [player]
      };
      updatedClans = [teamWinter1, ...clans];
    } else {
      // Check if player is already in Team Winter 1
      if (!teamWinter1.players.some(p => p.id === player.id)) {
        updatedClans = clans.map(clan => 
          clan.name === 'Team Winter 1' 
            ? { ...clan, players: [...clan.players, player] }
            : clan
        );
      }
    }

    // Update clans state
    setClans(updatedClans);

    // Remove player from roster
    useRosterStore.setState({
      roster: roster.filter(p => p.id !== player.id)
    });
  };

  const PlayerCard = ({ player, isInRoster = false }: { player: Player; isInRoster?: boolean }) => (
    <div 
      className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 transition cursor-pointer"
      onDoubleClick={() => isInRoster ? handlePlayerDoubleClick(player) : undefined}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{player.accountName}</p>
          <p className="text-sm text-gray-600">TH {player.townhallLevel}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4" />
            <span className="text-sm">{player.previousStars}/21</span>
          </div>
          <p className="text-sm text-gray-600">{player.previousPercentage}%</p>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading roster: {error}
      </div>
    );
  }

  if (showCWLSetup) {
    return (
      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">CWL Indeling</h1>
            <button
              onClick={() => setShowCWLSetup(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={newClanName}
              onChange={(e) => setNewClanName(e.target.value)}
              placeholder="Clan naam"
              className="px-3 py-2 border rounded-lg flex-1"
            />
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              {LEAGUES.map(league => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
            <button
              onClick={handleCreateClan}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="h-5 w-5" />
              Voeg Clan Toe
            </button>
          </div>

          <div className="flex gap-6">
            {/* Available Players */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Beschikbare Spelers</h2>
                  <span className="text-sm text-gray-600">{roster.length}</span>
                </div>
                <div className="space-y-2 min-h-[500px]">
                  {loading ? (
                    <div className="text-center py-4 text-gray-500">Loading...</div>
                  ) : (
                    roster.map((player) => (
                      <PlayerCard key={player.id} player={player} isInRoster={true} />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Clans */}
            <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
              {clans.map(clan => (
                <div key={clan.id} className="w-64 flex-shrink-0">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex flex-col gap-2 mb-4">
                      <h3 className="font-semibold">{clan.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Trophy className="h-4 w-4" />
                          <span>{clan.league}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">{clan.players.length}/15</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 min-h-[500px] rounded-lg border-2 border-dashed border-gray-200 p-2">
                      {clan.players.map((player) => (
                        <PlayerCard key={player.id} player={player} isInRoster={false} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => {
                setShowCWLSetup(false);
              }}
            >
              Opslaan
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* CWL Management */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">CWL Management</h2>
            
            <div>
              <h3 className="font-semibold mb-4">Ingeschreven Spelers</h3>
              <div className="space-y-2">
                {loading ? (
                  <div className="text-center py-4 text-gray-500">Loading...</div>
                ) : roster.length > 0 ? (
                  roster.map((player) => (
                    <PlayerCard key={player.id} player={player} isInRoster={true} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No players enrolled yet</p>
                )}
              </div>
            </div>
          </div>

          {/* CWL Setup */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">CWL Setup</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowCWLSetup(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Start CWL Indeling
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;