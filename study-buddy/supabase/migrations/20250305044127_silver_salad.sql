/*
  # Initial Schema Setup for AI Study Assistant

  1. New Tables
    - study_sessions
      - Tracks individual study sessions
      - Stores duration and completion status
    - flashcards
      - Stores AI-generated flashcards
      - Links cards to specific topics and users

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create study_sessions table
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  duration INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- Create policies for study_sessions
CREATE POLICY "Users can view own study sessions"
  ON study_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own study sessions"
  ON study_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study sessions"
  ON study_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for flashcards
CREATE POLICY "Users can view own flashcards"
  ON flashcards
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own flashcards"
  ON flashcards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcards"
  ON flashcards
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);