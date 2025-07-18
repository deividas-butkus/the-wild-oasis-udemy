import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://umjziqypywdmvwglyegr.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtanppcXlweXdkbXZ3Z2x5ZWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyOTMwMzAsImV4cCI6MjA2NDg2OTAzMH0.VDKB7u6ZInfZzBfefeZhh017eOH0DzgRR1zWAQjXrRs";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
