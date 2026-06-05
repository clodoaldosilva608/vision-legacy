import { create } from 'zustand';
import { createClient } from '../utils/supabase/client';
import { User } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  role: 'user' | 'admin';
  full_name: string | null;
  avatar_url: string | null;
  vision_score: number;
  plan_type: string;
  birth_date?: string;
  goals?: string[];
  interests?: string[];
  numerology_map?: any;
  archetype?: string;
  evolution_level?: string;
  ai_api_key?: string;
  ai_provider?: string;
};

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  checkSession: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  signOut: () => Promise<void>;
}

const supabase = createClient();

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  checkSession: async () => {
    set({ isLoading: true });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // Buscar o perfil correspondente
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      set({ user: session.user, profile: profile as Profile, isLoading: false });
    } else {
      set({ user: null, profile: null, isLoading: false });
    }
  },
  updateProfile: async (updates) => {
    const { user, profile } = get();
    if (!user) return;
    
    // Atualizar no Supabase
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
      
    if (!error && profile) {
      // Atualizar estado local
      set({ profile: { ...profile, ...updates } });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },
}));
