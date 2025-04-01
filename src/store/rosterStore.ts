import { create } from 'zustand';
import { Player } from '../types';
import { supabase } from '../lib/supabase';

interface RosterState {
  roster: Player[];
  loading: boolean;
  error: string | null;
  addPlayer: (player: Player) => Promise<void>;
  removePlayer: (playerId: string) => Promise<void>;
  updateRoster: (players: Player[]) => void;
  clearRoster: () => void;
  fetchRoster: () => Promise<void>;
}

export const useRosterStore = create<RosterState>((set) => ({
  roster: [],
  loading: false,
  error: null,

  fetchRoster: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const players: Player[] = data.map(p => ({
        id: p.id,
        accountName: p.account_name,
        townhallLevel: p.townhall_level,
        previousLeague: p.previous_league,
        previousStars: p.previous_stars,
        previousPercentage: p.previous_percentage,
        comments: p.comments || undefined,
        confirmed: p.confirmed || false,
        createdAt: p.created_at,
      }));

      set({ roster: players, loading: false });
    } catch (error) {
      console.error('Error fetching roster:', error);
      set({ error: 'Failed to fetch roster', loading: false });
    }
  },

  addPlayer: async (player: Player) => {
    try {
      const { error } = await supabase
        .from('players')
        .insert({
          id: player.id,
          account_name: player.accountName,
          townhall_level: player.townhallLevel,
          previous_league: player.previousLeague,
          previous_stars: player.previousStars,
          previous_percentage: player.previousPercentage,
          comments: player.comments,
          confirmed: player.confirmed,
          created_at: player.createdAt,
        });

      if (error) throw error;

      set((state) => ({
        roster: [player, ...state.roster],
      }));
    } catch (error) {
      console.error('Error adding player:', error);
      set({ error: 'Failed to add player' });
    }
  },

  removePlayer: async (playerId: string) => {
    try {
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', playerId);

      if (error) throw error;

      set((state) => ({
        roster: state.roster.filter(p => p.id !== playerId),
      }));
    } catch (error) {
      console.error('Error removing player:', error);
      set({ error: 'Failed to remove player' });
    }
  },

  updateRoster: (players) => set({ roster: players }),
  clearRoster: () => set({ roster: [], error: null }),
}));