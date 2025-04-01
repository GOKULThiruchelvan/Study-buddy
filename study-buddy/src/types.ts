export interface StudyMaterial {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'audio';
  summary?: string;
  keywords?: string[];
}

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  schedule: StudySession[];
  progress: number;
}

export interface StudySession {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  materials: StudyMaterial[];
}

export interface User {
  id: string;
  name: string;
  goals: string[];
  progress: {
    completedSessions: number;
    totalSessions: number;
    streak: number;
  };
}