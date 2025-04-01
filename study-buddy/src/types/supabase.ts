export interface Database {
  public: {
    Tables: {
      study_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          duration: number;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          duration: number;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          duration?: number;
          completed?: boolean;
          created_at?: string;
        };
      };
      flashcards: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          question: string;
          answer: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          question: string;
          answer: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic?: string;
          question?: string;
          answer?: string;
          created_at?: string;
        };
      };
    };
  };
}