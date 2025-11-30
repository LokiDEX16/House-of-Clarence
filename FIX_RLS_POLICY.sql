-- Run this in Supabase SQL Editor to add missing RLS policy

-- Add INSERT policy for users table (allows users to create their own profile)
CREATE POLICY "users_insert_own" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);
