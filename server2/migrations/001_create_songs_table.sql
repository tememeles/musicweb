-- Migration: create songs table
CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  duration TEXT DEFAULT '',
  audio_url TEXT NOT NULL,
  file_size BIGINT,
  file_format TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
