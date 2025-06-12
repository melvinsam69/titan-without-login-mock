/*
  # Create review form metadata table

  1. New Tables
    - `review_form_metadata`
      - `id` (uuid, primary key)
      - `initiative_id` (uuid, foreign key)
      - `iscm_level` (text)
      - `functional_level` (text)
      - `department_level` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `review_form_metadata` table
    - Add policy for public access (since auth is removed)
*/

CREATE TABLE IF NOT EXISTS review_form_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id uuid,
  iscm_level text DEFAULT '',
  functional_level text DEFAULT '',
  department_level text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE review_form_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on review_form_metadata"
  ON review_form_metadata
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);