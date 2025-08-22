import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fylzmzizavzhunrpxlvb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5bHpteml6YXZ6aHVucnB4bHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTc0NDQsImV4cCI6MjA3MTM5MzQ0NH0.J2RDmjfgerufFc2y4ElyJvDUCQvXQb31afUlVsSGe-s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
