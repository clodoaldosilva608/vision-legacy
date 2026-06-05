/**
 * hooks/useSupabaseData.ts
 * Hooks React para conectar as telas do Vision Legacy ao Supabase
 */
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '../utils/supabase/client';
import { useAuthStore } from '../store/useAuthStore';

const supabase = createClient();

// ============================================
// HOOK: Hábitos
// ============================================
export type Habit = {
  id: string;
  name: string;
  description?: string;
  category: string;
  icon: string;
  color: string;
  streak: number;
  best_streak: number;
  completed_today: boolean;
  frequency: string;
};

export function useHabits() {
  const { user } = useAuthStore();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
    setHabits(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchHabits(); }, [fetchHabits]);

  const toggleHabit = async (id: string, completed: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const newStreak = completed ? habit.streak + 1 : Math.max(0, habit.streak - 1);
    const newBest = Math.max(newStreak, habit.best_streak);

    await supabase.from('habits').update({
      completed_today: completed,
      streak: newStreak,
      best_streak: newBest,
      last_completed: completed ? today : null,
    }).eq('id', id);

    if (completed) {
      await supabase.from('habit_logs').insert({ habit_id: id, user_id: user!.id, completed_at: today });
    }

    setHabits(prev => prev.map(h => h.id === id ? { ...h, completed_today: completed, streak: newStreak, best_streak: newBest } : h));
  };

  const addHabit = async (habit: Partial<Habit>) => {
    if (!user) return;
    const { data } = await supabase.from('habits').insert({ ...habit, user_id: user.id }).select().single();
    if (data) setHabits(prev => [...prev, data]);
  };

  const deleteHabit = async (id: string) => {
    await supabase.from('habits').delete().eq('id', id);
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  return { habits, loading, toggleHabit, addHabit, deleteHabit, refresh: fetchHabits };
}

// ============================================
// HOOK: Metas
// ============================================
export type Goal = {
  id: string;
  title: string;
  description?: string;
  category: string;
  progress: number;
  status: 'Ativa' | 'Pausada' | 'Concluída' | 'Cancelada';
  priority: 'Alta' | 'Média' | 'Baixa';
  deadline?: string;
};

export function useGoals() {
  const { user } = useAuthStore();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setGoals(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchGoals(); }, [fetchGoals]);

  const updateGoalProgress = async (id: string, progress: number) => {
    const status = progress >= 100 ? 'Concluída' : 'Ativa';
    await supabase.from('goals').update({ progress, status }).eq('id', id);
    setGoals(prev => prev.map(g => g.id === id ? { ...g, progress, status } : g));
  };

  const addGoal = async (goal: Partial<Goal>) => {
    if (!user) return;
    const { data } = await supabase.from('goals').insert({ ...goal, user_id: user.id }).select().single();
    if (data) setGoals(prev => [data, ...prev]);
  };

  const deleteGoal = async (id: string) => {
    await supabase.from('goals').delete().eq('id', id);
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  return { goals, loading, updateGoalProgress, addGoal, deleteGoal, refresh: fetchGoals };
}

// ============================================
// HOOK: Projetos
// ============================================
export type Project = {
  id: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Done' | 'Blocked';
  category: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  tasks_completed: number;
  tasks_total: number;
  deadline?: string;
  color: string;
};

export function useProjects() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setProjects(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const moveProject = async (id: string, status: Project['status']) => {
    await supabase.from('projects').update({ status }).eq('id', id);
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const addProject = async (project: Partial<Project>) => {
    if (!user) return;
    const { data } = await supabase.from('projects').insert({ ...project, user_id: user.id }).select().single();
    if (data) setProjects(prev => [data, ...prev]);
  };

  return { projects, loading, moveProject, addProject, refresh: fetchProjects };
}

// ============================================
// HOOK: Wealth Records
// ============================================
export type WealthRecord = {
  id: string;
  month: string;
  year: number;
  total_assets: number;
  total_liabilities: number;
  net_worth: number;
  passive_income: number;
};

export function useWealth() {
  const { user } = useAuthStore();
  const [records, setRecords] = useState<WealthRecord[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      setLoading(true);
      const [{ data: recs }, { data: asst }] = await Promise.all([
        supabase.from('wealth_records').select('*').eq('user_id', user.id).order('year').order('month'),
        supabase.from('wealth_assets').select('*').eq('user_id', user.id),
      ]);
      setRecords(recs || []);
      setAssets(asst || []);
      setLoading(false);
    };
    fetchAll();
  }, [user]);

  return { records, assets, loading };
}
