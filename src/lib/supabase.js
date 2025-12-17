import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://ileyipdgwxzuyilwldkr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZXlpcGRnd3h6dXlpbHdsZGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NDUxNDIsImV4cCI6MjA4MTMyMTE0Mn0.BsV5fxRvRLuFfhAl4DCBgIKt-oTauH3chqgtVxyDaps"
)
