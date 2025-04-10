
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://mbsafykntffuvwbnzsdx.supabase.co',      // 프로젝트 URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ic2FmeWtudGZmdXZ3Ym56c2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNzkxMTIsImV4cCI6MjA1OTc1NTExMn0.vDCxjV_paQNUSqf7vcwlUNJd80RLVmC-o5dT1kcCGzE'  // 익명 공개 키
);