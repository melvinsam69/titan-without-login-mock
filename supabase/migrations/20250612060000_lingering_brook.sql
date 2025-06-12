/*
  # Create goals table for initiatives

  1. New Tables
    - `goals`
      - `id` (uuid, primary key)
      - `initiative_id` (uuid, foreign key)
      - `goal_year` (text)
      - `status_update` (text)
      - `driver` (text)
      - `department` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `goals` table
    - Add policy for public access
*/

CREATE TABLE IF NOT EXISTS goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id uuid,
  goal_year text DEFAULT '',
  status_update text DEFAULT 'Not Started',
  driver text DEFAULT '',
  department text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on goals"
  ON goals
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);