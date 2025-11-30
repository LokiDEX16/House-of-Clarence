-- Run this in Supabase SQL Editor to set up storage for checkout images

-- Enable the storage schema (usually already enabled)
CREATE SCHEMA IF NOT EXISTS storage;

-- The checkout-images bucket should be created via the Supabase dashboard or CLI
-- But you can use this SQL for RLS policies on the bucket

-- Note: Buckets are typically managed via Supabase dashboard:
-- 1. Go to Storage → Buckets
-- 2. Create new bucket named "checkout-images"
-- 3. Make it public (or private with RLS policies)
-- 4. Add RLS policies:

-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'checkout-images' AND auth.role() = 'authenticated');

-- Allow anyone to view files
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'checkout-images');

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'checkout-images' AND auth.uid()::text = (storage.foldername(name))[1]);
