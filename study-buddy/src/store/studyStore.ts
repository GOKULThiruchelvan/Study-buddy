import { create } from 'zustand';
import { User, StudyPlan, StudyMaterial } from '../types';
import { supabase } from '../lib/supabase';

interface StudyStore {
  user: User | null;
  currentPlan: StudyPlan | null;
  materials: StudyMaterial[];
  loading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  setPlan: (plan: StudyPlan) => void;
  addMaterial: (material: StudyMaterial) => void;
  updateProgress: (sessionId: string) => void;
  fetchStudySessions: () => Promise<void>;
  createStudySession: (title: string, duration: number) => Promise<void>;
  updateStudySession: (id: string, completed: boolean) => Promise<void>;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
  user: null,
  currentPlan: null,
  materials: [],
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setPlan: (plan) => set({ currentPlan: plan }),
  
  addMaterial: (material) => 
    set((state) => ({ materials: [...state.materials, material] })),
  
  updateProgress: (sessionId) =>
    set((state) => {
      if (!state.currentPlan) return state;
      
      const updatedSessions = state.currentPlan.schedule.map(session =>
        session.id === sessionId ? { ...session, completed: true } : session
      );
      
      const completed = updatedSessions.filter(s => s.completed).length;
      const total = updatedSessions.length;
      
      return {
        currentPlan: {
          ...state.currentPlan,
          schedule: updatedSessions,
          progress: (completed / total) * 100
        }
      };
    }),

  fetchStudySessions: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('study_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const sessions = data.map(session => ({
        id: session.id,
        title: session.title,
        duration: session.duration,
        completed: session.completed,
        created_at: session.created_at
      }));

      set((state) => ({
        currentPlan: {
          ...state.currentPlan,
          schedule: sessions
        },
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createStudySession: async (title: string, duration: number) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('study_sessions')
        .insert([
          {
            title,
            duration,
            user_id: (await supabase.auth.getUser()).data.user?.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        currentPlan: {
          ...state.currentPlan,
          schedule: [...(state.currentPlan?.schedule || []), data]
        },
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateStudySession: async (id: string, completed: boolean) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('study_sessions')
        .update({ completed })
        .eq('id', id);

      if (error) throw error;

      set((state) => {
        const updatedSessions = state.currentPlan?.schedule.map(session =>
          session.id === id ? { ...session, completed } : session
        ) || [];

        return {
          currentPlan: {
            ...state.currentPlan!,
            schedule: updatedSessions
          },
          loading: false
        };
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
}));